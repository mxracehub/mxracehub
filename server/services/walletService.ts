// Comprehensive Wallet Service - Auto-sync with Login, Funding & Withdrawals
import { db } from "../db";
import { users, bankAccounts, cryptoWallets, walletTransactions, paymentMethods } from "@shared/schema";
import { eq, and, desc } from "drizzle-orm";
import Stripe from "stripe";
import { houseBankService } from "./houseBankService";

// Initialize Stripe if available
let stripe: Stripe | undefined;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20",
  });
}

export class WalletService {
  
  // Get complete wallet data for account sync
  async getWalletData(userId: number) {
    try {
      const [user, bankAccountsList, cryptoWalletsList, paymentMethodsList, recentTransactions] = await Promise.all([
        db.select().from(users).where(eq(users.id, userId)).limit(1),
        db.select().from(bankAccounts).where(eq(bankAccounts.userId, userId)),
        db.select().from(cryptoWallets).where(eq(cryptoWallets.userId, userId)),
        db.select().from(paymentMethods).where(eq(paymentMethods.userId, userId)),
        db.select().from(walletTransactions)
          .where(eq(walletTransactions.userId, userId))
          .orderBy(desc(walletTransactions.createdAt))
          .limit(10)
      ]);

      const userRecord = user[0];
      if (!userRecord) {
        throw new Error('User not found');
      }

      return {
        balance: parseFloat(userRecord.accountBalance || '0.00'),
        currency: 'USD',
        bankAccounts: bankAccountsList.map(account => ({
          ...account,
          accountNumber: this.maskAccountNumber(account.accountNumber),
          routingNumber: this.maskRoutingNumber(account.routingNumber)
        })),
        cryptoWallets: cryptoWalletsList,
        paymentMethods: paymentMethodsList,
        recentTransactions: recentTransactions,
        canWithdraw: parseFloat(userRecord.accountBalance || '0.00') > 0,
        limits: {
          dailyWithdrawal: 5000,
          monthlyWithdrawal: 25000,
          minimumWithdrawal: 10,
          maximumDeposit: 10000
        }
      };
    } catch (error) {
      console.error('Error getting wallet data:', error);
      throw error;
    }
  }

  // Add funds to account via multiple methods - integrated with house bank
  async addFunds(userId: number, method: string, amount: number, paymentDetails: any) {
    try {
      if (amount < 1 || amount > 10000) {
        throw new Error('Amount must be between $1 and $10,000');
      }

      let transactionResult;
      
      switch (method) {
        case 'stripe_card':
          transactionResult = await this.processStripePayment(userId, amount, paymentDetails);
          break;
        case 'bank_transfer':
          transactionResult = await this.processBankTransfer(userId, amount, paymentDetails);
          break;
        case 'crypto':
          transactionResult = await this.processCryptoDeposit(userId, amount, paymentDetails);
          break;
        case 'paypal':
          transactionResult = await this.processPayPalPayment(userId, amount, paymentDetails);
          break;
        default:
          throw new Error('Unsupported payment method');
      }

      // Process deposit through house bank system if successful
      if (transactionResult.status === 'completed') {
        const result = await houseBankService.processUserDeposit(
          userId, 
          amount, 
          transactionResult.externalId, 
          method
        );
        
        return {
          success: true,
          transaction: transactionResult,
          newBalance: result.newBalance
        };
      } else {
        // Record pending transaction
        await db.insert(walletTransactions).values({
          userId,
          transactionType: 'deposit',
          method,
          amount: amount.toString(),
          status: transactionResult.status,
          externalTransactionId: transactionResult.externalId,
          destinationDetails: paymentDetails,
          fees: transactionResult.fees || '0.00',
          notes: transactionResult.notes
        });

        return {
          success: true,
          transaction: transactionResult,
          newBalance: await this.getUserBalance(userId)
        };
      }
    } catch (error) {
      console.error('Error adding funds:', error);
      throw error;
    }
  }

  // Withdraw funds to bank account or crypto wallet - integrated with house bank
  async withdrawFunds(userId: number, method: string, amount: number, destinationDetails: any) {
    try {
      if (amount < 10) {
        throw new Error('Minimum withdrawal amount is $10');
      }

      const fees = this.calculateWithdrawalFees(method, amount);
      
      // Process withdrawal through house bank system (includes all validation)
      const result = await houseBankService.processUserWithdrawal(
        userId, 
        amount, 
        fees, 
        { ...destinationDetails, method }
      );

      return {
        success: true,
        transaction: { transactionId: result.transactionId },
        newBalance: result.newBalance,
        fees
      };
    } catch (error) {
      console.error('Error withdrawing funds:', error);
      throw error;
    }
  }

  // Add bank account for withdrawals
  async addBankAccount(userId: number, accountDetails: any) {
    try {
      const [bankAccount] = await db.insert(bankAccounts).values({
        userId,
        accountHolderName: accountDetails.accountHolderName,
        accountNumber: this.encryptSensitiveData(accountDetails.accountNumber),
        routingNumber: this.encryptSensitiveData(accountDetails.routingNumber),
        accountType: accountDetails.accountType,
        bankName: accountDetails.bankName,
        isDefault: accountDetails.isDefault || false
      }).returning();

      return {
        ...bankAccount,
        accountNumber: this.maskAccountNumber(bankAccount.accountNumber),
        routingNumber: this.maskRoutingNumber(bankAccount.routingNumber)
      };
    } catch (error) {
      console.error('Error adding bank account:', error);
      throw error;
    }
  }

  // Add crypto wallet for withdrawals
  async addCryptoWallet(userId: number, walletDetails: any) {
    try {
      // Validate wallet address format
      if (!this.isValidCryptoAddress(walletDetails.walletAddress, walletDetails.cryptocurrency)) {
        throw new Error('Invalid wallet address format');
      }

      const [cryptoWallet] = await db.insert(cryptoWallets).values({
        userId,
        walletName: walletDetails.walletName,
        walletAddress: walletDetails.walletAddress,
        cryptocurrency: walletDetails.cryptocurrency,
        network: walletDetails.network,
        isDefault: walletDetails.isDefault || false
      }).returning();

      return cryptoWallet;
    } catch (error) {
      console.error('Error adding crypto wallet:', error);
      throw error;
    }
  }

  // Process Stripe payment
  private async processStripePayment(userId: number, amount: number, paymentDetails: any) {
    if (!stripe) {
      throw new Error('Stripe not configured');
    }

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: 'usd',
        payment_method: paymentDetails.paymentMethodId,
        confirm: true,
        return_url: paymentDetails.returnUrl
      });

      return {
        status: paymentIntent.status === 'succeeded' ? 'completed' : 'pending',
        externalId: paymentIntent.id,
        fees: 0, // Stripe fees handled separately
        notes: `Stripe payment: ${paymentIntent.id}`
      };
    } catch (error) {
      throw new Error(`Stripe payment failed: ${error.message}`);
    }
  }

  // Process bank transfer (ACH)
  private async processBankTransfer(userId: number, amount: number, paymentDetails: any) {
    // In production, integrate with banking API like Plaid or Dwolla
    // For now, simulate ACH transfer
    return {
      status: 'pending', // ACH transfers take 1-3 business days
      externalId: `ACH_${Date.now()}_${userId}`,
      fees: 0,
      notes: 'ACH bank transfer initiated - will complete in 1-3 business days'
    };
  }

  // Process crypto deposit
  private async processCryptoDeposit(userId: number, amount: number, paymentDetails: any) {
    // In production, integrate with crypto payment processor like Coinbase Commerce
    // For now, generate deposit address
    const depositAddress = this.generateCryptoDepositAddress(paymentDetails.cryptocurrency);
    
    return {
      status: 'pending',
      externalId: `CRYPTO_${Date.now()}_${userId}`,
      fees: 0,
      notes: `Send ${paymentDetails.cryptocurrency} to: ${depositAddress}`
    };
  }

  // Process PayPal payment
  private async processPayPalPayment(userId: number, amount: number, paymentDetails: any) {
    // In production, integrate with PayPal API
    return {
      status: 'pending',
      externalId: `PP_${Date.now()}_${userId}`,
      fees: Math.round(amount * 0.029 * 100) / 100, // PayPal fees ~2.9%
      notes: 'PayPal payment processing'
    };
  }

  // Process bank withdrawal
  private async processBankWithdrawal(userId: number, amount: number, destinationDetails: any) {
    // In production, use banking API for ACH transfers
    return {
      status: 'pending',
      externalId: `BANK_WD_${Date.now()}_${userId}`,
      notes: 'Bank withdrawal initiated - will complete in 1-3 business days'
    };
  }

  // Process crypto withdrawal
  private async processCryptoWithdrawal(userId: number, amount: number, destinationDetails: any) {
    // In production, use crypto exchange API
    return {
      status: 'pending',
      externalId: `CRYPTO_WD_${Date.now()}_${userId}`,
      notes: `Crypto withdrawal to ${destinationDetails.walletAddress}`
    };
  }

  // Calculate withdrawal fees
  private calculateWithdrawalFees(method: string, amount: number): number {
    switch (method) {
      case 'bank_transfer':
        return 2.50; // Flat ACH fee
      case 'crypto':
        return Math.min(amount * 0.01, 25); // 1% up to $25
      default:
        return 0;
    }
  }

  // Update user balance
  private async updateUserBalance(userId: number, amount: number, operation: 'add' | 'subtract') {
    const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user[0]) throw new Error('User not found');

    const currentBalance = parseFloat(user[0].accountBalance || '0.00');
    const newBalance = operation === 'add' 
      ? currentBalance + amount 
      : currentBalance - amount;

    await db.update(users)
      .set({ accountBalance: newBalance.toFixed(2) })
      .where(eq(users.id, userId));

    return newBalance;
  }

  // Get user balance
  private async getUserBalance(userId: number): Promise<number> {
    const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    return parseFloat(user[0]?.accountBalance || '0.00');
  }

  // Security helpers
  private encryptSensitiveData(data: string): string {
    // In production, use proper encryption
    return Buffer.from(data).toString('base64');
  }

  private decryptSensitiveData(encryptedData: string): string {
    // In production, use proper decryption
    return Buffer.from(encryptedData, 'base64').toString();
  }

  private maskAccountNumber(accountNumber: string): string {
    const decrypted = this.decryptSensitiveData(accountNumber);
    return `****${decrypted.slice(-4)}`;
  }

  private maskRoutingNumber(routingNumber: string): string {
    const decrypted = this.decryptSensitiveData(routingNumber);
    return `****${decrypted.slice(-4)}`;
  }

  private isValidCryptoAddress(address: string, cryptocurrency: string): boolean {
    // Basic validation - in production, use proper crypto address validation
    const patterns = {
      BTC: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/,
      ETH: /^0x[a-fA-F0-9]{40}$/,
      USDC: /^0x[a-fA-F0-9]{40}$/
    };
    
    return patterns[cryptocurrency]?.test(address) || false;
  }

  private generateCryptoDepositAddress(cryptocurrency: string): string {
    // In production, generate real deposit addresses via crypto API
    const mockAddresses = {
      BTC: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      ETH: '0x742d35Cc6634C0532925a3b8D20A7e19',
      USDC: '0x742d35Cc6634C0532925a3b8D20A7e19'
    };
    
    return mockAddresses[cryptocurrency] || 'ADDRESS_GENERATION_ERROR';
  }
}

export const walletService = new WalletService();