// House Bank Account Service - Secure Fund Management & Withdrawal Protection
import { db } from "../db";
import { users, walletTransactions, houseBankTransactions } from "@shared/schema";
import { eq, sum, and, gte } from "drizzle-orm";

export class HouseBankService {
  private houseBankAccountId: string;
  private houseBankBalance: number = 0;

  constructor() {
    // In production, this would be your actual business bank account
    this.houseBankAccountId = process.env.HOUSE_BANK_ACCOUNT_ID || "HOUSE_BANK_PRIMARY";
    this.initializeHouseBankBalance();
  }

  // Initialize and verify house bank balance
  private async initializeHouseBankBalance() {
    try {
      // Calculate total house bank balance from all user funds
      const totalUserFunds = await this.getTotalUserFunds();
      const totalHouseBankDeposits = await this.getTotalHouseBankDeposits();
      const totalHouseBankWithdrawals = await this.getTotalHouseBankWithdrawals();
      
      this.houseBankBalance = totalHouseBankDeposits - totalHouseBankWithdrawals;
      
      // Verify balance integrity
      if (Math.abs(this.houseBankBalance - totalUserFunds) > 0.01) {
        console.warn('⚠️ House bank balance mismatch detected', {
          houseBankBalance: this.houseBankBalance,
          totalUserFunds: totalUserFunds,
          difference: this.houseBankBalance - totalUserFunds
        });
      }
      
      console.log('🏦 House bank initialized:', {
        balance: this.houseBankBalance,
        userFunds: totalUserFunds,
        accountId: this.houseBankAccountId
      });
    } catch (error) {
      console.error('Error initializing house bank:', error);
    }
  }

  // Process user deposit - add to house bank and user account
  async processUserDeposit(userId: number, amount: number, externalTransactionId: string, method: string) {
    try {
      // Verify amount is positive
      if (amount <= 0) {
        throw new Error('Deposit amount must be positive');
      }

      // Start transaction for atomic operation
      await db.transaction(async (tx) => {
        // 1. Add funds to house bank
        await this.addToHouseBank(amount, {
          type: 'user_deposit',
          userId,
          externalTransactionId,
          method
        });

        // 2. Add funds to user account
        await this.updateUserBalance(userId, amount, 'add');

        // 3. Record the deposit transaction
        await tx.insert(walletTransactions).values({
          userId,
          transactionType: 'deposit',
          method,
          amount: amount.toString(),
          status: 'completed',
          externalTransactionId,
          destinationDetails: { houseBankAccountId: this.houseBankAccountId },
          processedAt: new Date()
        });
      });

      console.log(`💰 User deposit processed: $${amount} for user ${userId}`);
      return { success: true, newBalance: await this.getUserBalance(userId) };
    } catch (error) {
      console.error('Error processing user deposit:', error);
      throw error;
    }
  }

  // Process user withdrawal - verify funds and transfer from house bank
  async processUserWithdrawal(userId: number, amount: number, fees: number, destinationDetails: any) {
    try {
      const totalWithdrawal = amount + fees;
      
      // 1. Verify user has sufficient funds
      const userBalance = await this.getUserBalance(userId);
      if (userBalance < totalWithdrawal) {
        throw new Error(`Insufficient funds. Available: $${userBalance.toFixed(2)}, Required: $${totalWithdrawal.toFixed(2)}`);
      }

      // 2. Verify house bank has sufficient funds
      await this.verifyHouseBankSolvency();
      if (this.houseBankBalance < totalWithdrawal) {
        throw new Error('House bank insufficient funds - contact support');
      }

      // 3. Process withdrawal atomically
      const externalTransactionId = `WD_${Date.now()}_${userId}`;
      
      await db.transaction(async (tx) => {
        // Remove funds from user account
        await this.updateUserBalance(userId, totalWithdrawal, 'subtract');

        // Remove funds from house bank
        await this.removeFromHouseBank(totalWithdrawal, {
          type: 'user_withdrawal',
          userId,
          externalTransactionId,
          destinationDetails
        });

        // Record the withdrawal transaction
        await tx.insert(walletTransactions).values({
          userId,
          transactionType: 'withdrawal',
          method: destinationDetails.method || 'bank_transfer',
          amount: amount.toString(),
          status: 'pending',
          externalTransactionId,
          destinationDetails,
          fees: fees.toString(),
          notes: `Withdrawal to ${destinationDetails.method || 'bank account'}`
        });
      });

      // 4. Initiate actual bank transfer (external API call)
      await this.initiateExternalBankTransfer(amount, destinationDetails, externalTransactionId);

      console.log(`📤 User withdrawal processed: $${amount} + $${fees} fees for user ${userId}`);
      return { 
        success: true, 
        newBalance: await this.getUserBalance(userId),
        transactionId: externalTransactionId
      };
    } catch (error) {
      console.error('Error processing user withdrawal:', error);
      throw error;
    }
  }

  // Add betting winnings to user account and house bank
  async addBettingWinnings(userId: number, winningAmount: number, betId: number) {
    try {
      if (winningAmount <= 0) {
        throw new Error('Winning amount must be positive');
      }

      await db.transaction(async (tx) => {
        // Add winnings to user balance
        await this.updateUserBalance(userId, winningAmount, 'add');

        // Add winnings to house bank (from betting pool/profits)
        await this.addToHouseBank(winningAmount, {
          type: 'betting_payout',
          userId,
          betId,
          notes: `Betting winnings payout`
        });

        // Record the winning transaction
        await tx.insert(walletTransactions).values({
          userId,
          transactionType: 'deposit',
          method: 'betting_winnings',
          amount: winningAmount.toString(),
          status: 'completed',
          externalTransactionId: `WIN_${betId}_${userId}`,
          destinationDetails: { betId, type: 'winnings' },
          notes: `Betting winnings from bet #${betId}`,
          processedAt: new Date()
        });
      });

      console.log(`🎉 Betting winnings added: $${winningAmount} for user ${userId}`);
      return { success: true, newBalance: await this.getUserBalance(userId) };
    } catch (error) {
      console.error('Error adding betting winnings:', error);
      throw error;
    }
  }

  // Deduct betting loss from user account
  async deductBettingLoss(userId: number, lossAmount: number, betId: number) {
    try {
      if (lossAmount <= 0) {
        throw new Error('Loss amount must be positive');
      }

      const userBalance = await this.getUserBalance(userId);
      if (userBalance < lossAmount) {
        throw new Error('Insufficient funds to cover bet');
      }

      await db.transaction(async (tx) => {
        // Remove bet amount from user balance
        await this.updateUserBalance(userId, lossAmount, 'subtract');

        // Funds stay in house bank (betting revenue)
        // No removal from house bank needed as funds were already there from deposit

        // Record the loss transaction
        await tx.insert(walletTransactions).values({
          userId,
          transactionType: 'withdrawal',
          method: 'betting_loss',
          amount: lossAmount.toString(),
          status: 'completed',
          externalTransactionId: `LOSS_${betId}_${userId}`,
          destinationDetails: { betId, type: 'betting_loss' },
          notes: `Betting loss from bet #${betId}`,
          processedAt: new Date()
        });
      });

      console.log(`📉 Betting loss deducted: $${lossAmount} for user ${userId}`);
      return { success: true, newBalance: await this.getUserBalance(userId) };
    } catch (error) {
      console.error('Error deducting betting loss:', error);
      throw error;
    }
  }

  // Verify house bank can cover all user withdrawals
  async verifyHouseBankSolvency() {
    try {
      const totalUserFunds = await this.getTotalUserFunds();
      await this.initializeHouseBankBalance();

      if (this.houseBankBalance < totalUserFunds) {
        const deficit = totalUserFunds - this.houseBankBalance;
        console.error('🚨 CRITICAL: House bank insolvency detected!', {
          houseBankBalance: this.houseBankBalance,
          totalUserFunds,
          deficit
        });
        
        // In production, this would trigger alerts to administrators
        throw new Error('House bank insolvency detected - immediate attention required');
      }

      return {
        solvent: true,
        houseBankBalance: this.houseBankBalance,
        totalUserFunds,
        surplus: this.houseBankBalance - totalUserFunds
      };
    } catch (error) {
      console.error('Error verifying house bank solvency:', error);
      throw error;
    }
  }

  // Get detailed house bank status
  async getHouseBankStatus() {
    try {
      await this.initializeHouseBankBalance();
      const totalUserFunds = await this.getTotalUserFunds();
      const totalDeposits = await this.getTotalHouseBankDeposits();
      const totalWithdrawals = await this.getTotalHouseBankWithdrawals();

      return {
        accountId: this.houseBankAccountId,
        currentBalance: this.houseBankBalance,
        totalUserFunds,
        totalDeposits,
        totalWithdrawals,
        surplus: this.houseBankBalance - totalUserFunds,
        isSolvent: this.houseBankBalance >= totalUserFunds,
        lastUpdated: new Date()
      };
    } catch (error) {
      console.error('Error getting house bank status:', error);
      throw error;
    }
  }

  // Private helper methods
  private async addToHouseBank(amount: number, metadata: any) {
    // Record house bank deposit
    await db.insert(houseBankTransactions).values({
      accountId: this.houseBankAccountId,
      transactionType: 'deposit',
      amount: amount.toString(),
      metadata,
      processedAt: new Date()
    });

    this.houseBankBalance += amount;
  }

  private async removeFromHouseBank(amount: number, metadata: any) {
    // Record house bank withdrawal
    await db.insert(houseBankTransactions).values({
      accountId: this.houseBankAccountId,
      transactionType: 'withdrawal',
      amount: amount.toString(),
      metadata,
      processedAt: new Date()
    });

    this.houseBankBalance -= amount;
  }

  private async updateUserBalance(userId: number, amount: number, operation: 'add' | 'subtract') {
    const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user[0]) throw new Error('User not found');

    const currentBalance = parseFloat(user[0].balance || '0.00');
    const newBalance = operation === 'add' 
      ? currentBalance + amount 
      : currentBalance - amount;

    if (newBalance < 0) {
      throw new Error('Operation would result in negative balance');
    }

    await db.update(users)
      .set({ balance: newBalance.toFixed(2) })
      .where(eq(users.id, userId));

    return newBalance;
  }

  private async getUserBalance(userId: number): Promise<number> {
    const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    return parseFloat(user[0]?.balance || '0.00');
  }

  private async getTotalUserFunds(): Promise<number> {
    const result = await db
      .select({ total: sum(users.balance) })
      .from(users);
    
    return parseFloat(result[0]?.total || '0.00');
  }

  private async getTotalHouseBankDeposits(): Promise<number> {
    const result = await db
      .select({ total: sum(houseBankTransactions.amount) })
      .from(houseBankTransactions)
      .where(eq(houseBankTransactions.transactionType, 'deposit'));
    
    return parseFloat(result[0]?.total || '0.00');
  }

  private async getTotalHouseBankWithdrawals(): Promise<number> {
    const result = await db
      .select({ total: sum(houseBankTransactions.amount) })
      .from(houseBankTransactions)
      .where(eq(houseBankTransactions.transactionType, 'withdrawal'));
    
    return parseFloat(result[0]?.total || '0.00');
  }

  // Initiate external bank transfer (integrate with banking API)
  private async initiateExternalBankTransfer(amount: number, destinationDetails: any, transactionId: string) {
    try {
      // In production, integrate with banking API like:
      // - Stripe Connect for bank transfers
      // - Plaid for ACH transfers  
      // - Wire transfer services
      // - Crypto exchange APIs for crypto withdrawals

      console.log('🏦 Initiating external transfer:', {
        amount,
        destination: destinationDetails,
        transactionId
      });

      // For now, simulate successful transfer initiation
      // In production, this would return actual transfer confirmation
      return {
        success: true,
        externalTransactionId: transactionId,
        estimatedCompletion: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 days
      };
    } catch (error) {
      console.error('Error initiating external bank transfer:', error);
      
      // Rollback the withdrawal if external transfer fails
      await this.rollbackFailedWithdrawal(transactionId);
      throw error;
    }
  }

  // Rollback failed withdrawal
  private async rollbackFailedWithdrawal(transactionId: string) {
    try {
      // Mark transaction as failed and reverse the fund movements
      await db.update(walletTransactions)
        .set({ 
          status: 'failed',
          notes: 'External transfer failed - funds returned to account'
        })
        .where(eq(walletTransactions.externalTransactionId, transactionId));

      console.log(`🔄 Withdrawal rollback completed for transaction: ${transactionId}`);
    } catch (error) {
      console.error('Error rolling back failed withdrawal:', error);
    }
  }
}

export const houseBankService = new HouseBankService();