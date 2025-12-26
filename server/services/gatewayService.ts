// Payment Gateway Service - Professional Fund Transfer System
import { db } from "../db";
import { users, walletTransactions, houseBankTransactions } from "@shared/schema";
import { eq, sum, and, gte } from "drizzle-orm";

export class PaymentGatewayService {
  private gatewayName: string;
  private gatewayAccountId: string;
  private processingFees: {
    creditCard: number;
    bankTransfer: number;
    cryptoWithdrawal: number;
    baseWithdrawalFee: number;
  };

  constructor() {
    this.gatewayName = process.env.GATEWAY_NAME || "MXRaceHub Payment Gateway";
    this.gatewayAccountId = process.env.GATEWAY_ACCOUNT_ID || "MXRH_GATEWAY_001";
    
    // Configurable processing fees (in percentages and fixed amounts)
    this.processingFees = {
      creditCard: parseFloat(process.env.CREDIT_CARD_FEE || "2.9") / 100, // 2.9%
      bankTransfer: parseFloat(process.env.BANK_TRANSFER_FEE || "0.8") / 100, // 0.8%
      cryptoWithdrawal: parseFloat(process.env.CRYPTO_WITHDRAWAL_FEE || "1.0") / 100, // 1.0%
      baseWithdrawalFee: parseFloat(process.env.BASE_WITHDRAWAL_FEE || "2.50") // $2.50
    };

    console.log('💳 Payment Gateway Service initialized:', {
      gateway: this.gatewayName,
      accountId: this.gatewayAccountId,
      fees: this.processingFees
    });
  }

  // Process incoming deposit (credit card, bank transfer, crypto)
  async processDeposit(userId: number, amount: number, method: string, paymentDetails: any) {
    const transactionId = `dep_${Date.now()}_${userId}`;
    
    try {
      console.log('💰 Processing deposit:', { userId, amount, method, transactionId });

      // Calculate processing fee based on method
      const fee = this.calculateDepositFee(amount, method);
      const netAmount = amount - fee;

      // Validate minimum deposit after fees
      if (netAmount <= 0) {
        throw new Error(`Deposit amount too small. Minimum required: $${(fee + 0.01).toFixed(2)}`);
      }

      // Start database transaction
      await db.transaction(async (tx) => {
        // 1. Record the deposit transaction
        await tx.insert(walletTransactions).values({
          userId,
          amount: amount.toString(),
          transactionType: 'deposit',
          method,
          status: 'processing',
          externalTransactionId: transactionId,
          metadata: {
            originalAmount: amount,
            processingFee: fee,
            netAmount,
            paymentDetails: this.sanitizePaymentDetails(paymentDetails),
            gateway: this.gatewayName
          }
        });

        // 2. Process through external payment gateway
        const gatewayResponse = await this.processExternalDeposit(amount, method, paymentDetails, transactionId);

        if (gatewayResponse.success) {
          // 3. Update user balance with net amount
          await tx
            .update(users)
            .set({ 
              balance: db.sql`${users.balance} + ${netAmount}`,
              updatedAt: new Date()
            })
            .where(eq(users.id, userId));

          // 4. Record house bank transaction (pooled funds)
          await tx.insert(houseBankTransactions).values({
            accountId: this.gatewayAccountId,
            amount: netAmount.toString(),
            transactionType: 'deposit',
            metadata: {
              userId,
              originalAmount: amount,
              processingFee: fee,
              method,
              externalTransactionId: gatewayResponse.externalId,
              gateway: this.gatewayName
            }
          });

          // 5. Update transaction status to completed
          await tx
            .update(walletTransactions)
            .set({ 
              status: 'completed',
              metadata: {
                originalAmount: amount,
                processingFee: fee,
                netAmount,
                externalTransactionId: gatewayResponse.externalId,
                gateway: this.gatewayName,
                completedAt: new Date().toISOString()
              }
            })
            .where(eq(walletTransactions.externalTransactionId, transactionId));

          console.log('✅ Deposit processed successfully:', {
            userId,
            netAmount,
            externalId: gatewayResponse.externalId
          });

          return {
            success: true,
            transactionId,
            netAmount,
            processingFee: fee,
            externalTransactionId: gatewayResponse.externalId,
            estimatedArrival: gatewayResponse.estimatedArrival
          };
        } else {
          throw new Error(gatewayResponse.error || 'Payment processing failed');
        }
      });

    } catch (error) {
      console.error('❌ Deposit processing failed:', error);
      
      // Mark transaction as failed
      await db
        .update(walletTransactions)
        .set({ 
          status: 'failed',
          metadata: {
            error: error.message,
            failedAt: new Date().toISOString()
          }
        })
        .where(eq(walletTransactions.externalTransactionId, transactionId));

      throw error;
    }
  }

  // Process outgoing withdrawal (bank transfer, crypto)
  async processWithdrawal(userId: number, amount: number, method: string, destinationDetails: any) {
    const transactionId = `wd_${Date.now()}_${userId}`;
    
    try {
      console.log('💸 Processing withdrawal:', { userId, amount, method, transactionId });

      // Get current user balance
      const [user] = await db.select().from(users).where(eq(users.id, userId));
      if (!user) {
        throw new Error('User not found');
      }

      // Calculate withdrawal fee
      const fee = this.calculateWithdrawalFee(amount, method);
      const totalDeduction = amount + fee;

      // Validate sufficient balance
      if (user.balance < totalDeduction) {
        throw new Error(`Insufficient funds. Available: $${user.balance.toFixed(2)}, Required: $${totalDeduction.toFixed(2)} (including $${fee.toFixed(2)} fee)`);
      }

      // Start database transaction
      await db.transaction(async (tx) => {
        // 1. Deduct funds from user balance immediately
        await tx
          .update(users)
          .set({ 
            balance: db.sql`${users.balance} - ${totalDeduction}`,
            updatedAt: new Date()
          })
          .where(eq(users.id, userId));

        // 2. Record the withdrawal transaction
        await tx.insert(walletTransactions).values({
          userId,
          amount: amount.toString(),
          transactionType: 'withdrawal',
          method,
          status: 'processing',
          externalTransactionId: transactionId,
          metadata: {
            withdrawalAmount: amount,
            processingFee: fee,
            totalDeduction,
            destinationDetails: this.sanitizeDestinationDetails(destinationDetails),
            gateway: this.gatewayName
          }
        });

        // 3. Process through external payment gateway
        const gatewayResponse = await this.processExternalWithdrawal(amount, method, destinationDetails, transactionId);

        if (gatewayResponse.success) {
          // 4. Record house bank transaction (funds leaving)
          await tx.insert(houseBankTransactions).values({
            accountId: this.gatewayAccountId,
            amount: amount.toString(),
            transactionType: 'withdrawal',
            metadata: {
              userId,
              withdrawalAmount: amount,
              processingFee: fee,
              method,
              externalTransactionId: gatewayResponse.externalId,
              gateway: this.gatewayName,
              destinationDetails: this.sanitizeDestinationDetails(destinationDetails)
            }
          });

          // 5. Update transaction status to completed
          await tx
            .update(walletTransactions)
            .set({ 
              status: 'completed',
              metadata: {
                withdrawalAmount: amount,
                processingFee: fee,
                totalDeduction,
                externalTransactionId: gatewayResponse.externalId,
                gateway: this.gatewayName,
                completedAt: new Date().toISOString(),
                estimatedArrival: gatewayResponse.estimatedArrival?.toISOString()
              }
            })
            .where(eq(walletTransactions.externalTransactionId, transactionId));

          console.log('✅ Withdrawal processed successfully:', {
            userId,
            amount,
            externalId: gatewayResponse.externalId
          });

          return {
            success: true,
            transactionId,
            withdrawalAmount: amount,
            processingFee: fee,
            externalTransactionId: gatewayResponse.externalId,
            estimatedArrival: gatewayResponse.estimatedArrival
          };
        } else {
          // Rollback user balance if external processing fails
          await tx
            .update(users)
            .set({ 
              balance: db.sql`${users.balance} + ${totalDeduction}`,
              updatedAt: new Date()
            })
            .where(eq(users.id, userId));

          throw new Error(gatewayResponse.error || 'Withdrawal processing failed');
        }
      });

    } catch (error) {
      console.error('❌ Withdrawal processing failed:', error);
      
      // Mark transaction as failed
      await db
        .update(walletTransactions)
        .set({ 
          status: 'failed',
          metadata: {
            error: error.message,
            failedAt: new Date().toISOString()
          }
        })
        .where(eq(walletTransactions.externalTransactionId, transactionId));

      throw error;
    }
  }

  // Calculate deposit fee based on method
  private calculateDepositFee(amount: number, method: string): number {
    switch (method.toLowerCase()) {
      case 'credit_card':
      case 'debit_card':
        return amount * this.processingFees.creditCard;
      case 'bank_transfer':
      case 'ach':
        return amount * this.processingFees.bankTransfer;
      case 'crypto':
      case 'cryptocurrency':
        return 0; // No fee for crypto deposits
      default:
        return amount * this.processingFees.creditCard; // Default to credit card fee
    }
  }

  // Calculate withdrawal fee based on method
  private calculateWithdrawalFee(amount: number, method: string): number {
    switch (method.toLowerCase()) {
      case 'bank_transfer':
      case 'ach':
        return this.processingFees.baseWithdrawalFee;
      case 'crypto':
      case 'cryptocurrency':
        return amount * this.processingFees.cryptoWithdrawal;
      default:
        return this.processingFees.baseWithdrawalFee;
    }
  }

  // Process external deposit through payment gateway
  private async processExternalDeposit(amount: number, method: string, paymentDetails: any, transactionId: string) {
    // In production, integrate with Stripe, PayPal, crypto APIs, etc.
    console.log('🌐 Processing external deposit:', {
      amount,
      method,
      transactionId,
      gateway: this.gatewayName
    });

    // Mock external processing for development
    // Replace with actual gateway API calls
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

    return {
      success: true,
      externalId: `ext_dep_${Date.now()}`,
      estimatedArrival: new Date(Date.now() + 2 * 60 * 1000) // 2 minutes for testing
    };
  }

  // Process external withdrawal through payment gateway
  private async processExternalWithdrawal(amount: number, method: string, destinationDetails: any, transactionId: string) {
    // In production, integrate with bank APIs, crypto exchanges, etc.
    console.log('🌐 Processing external withdrawal:', {
      amount,
      method,
      transactionId,
      gateway: this.gatewayName
    });

    // Mock external processing for development
    // Replace with actual gateway API calls
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay

    return {
      success: true,
      externalId: `ext_wd_${Date.now()}`,
      estimatedArrival: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 business days
    };
  }

  // Sanitize payment details for storage (remove sensitive data)
  private sanitizePaymentDetails(paymentDetails: any) {
    const sanitized = { ...paymentDetails };
    
    // Remove sensitive card data
    if (sanitized.cardNumber) {
      sanitized.cardNumber = `****-****-****-${sanitized.cardNumber.slice(-4)}`;
    }
    if (sanitized.cvv) {
      delete sanitized.cvv;
    }
    if (sanitized.privateKey) {
      delete sanitized.privateKey;
    }
    
    return sanitized;
  }

  // Sanitize destination details for storage
  private sanitizeDestinationDetails(destinationDetails: any) {
    const sanitized = { ...destinationDetails };
    
    // Mask bank account numbers
    if (sanitized.accountNumber) {
      sanitized.accountNumber = `****${sanitized.accountNumber.slice(-4)}`;
    }
    
    return sanitized;
  }

  // Get gateway status and statistics
  async getGatewayStatus() {
    try {
      // Get transaction statistics
      const [depositStats] = await db
        .select({
          totalDeposits: sum(walletTransactions.amount),
          count: db.sql`COUNT(*)`
        })
        .from(walletTransactions)
        .where(and(
          eq(walletTransactions.transactionType, 'deposit'),
          eq(walletTransactions.status, 'completed')
        ));

      const [withdrawalStats] = await db
        .select({
          totalWithdrawals: sum(walletTransactions.amount),
          count: db.sql`COUNT(*)`
        })
        .from(walletTransactions)
        .where(and(
          eq(walletTransactions.transactionType, 'withdrawal'),
          eq(walletTransactions.status, 'completed')
        ));

      return {
        gatewayName: this.gatewayName,
        accountId: this.gatewayAccountId,
        status: 'active',
        fees: this.processingFees,
        statistics: {
          totalDeposits: parseFloat(depositStats?.totalDeposits || '0'),
          depositCount: parseInt(depositStats?.count || '0'),
          totalWithdrawals: parseFloat(withdrawalStats?.totalWithdrawals || '0'),
          withdrawalCount: parseInt(withdrawalStats?.count || '0')
        }
      };
    } catch (error) {
      console.error('Error getting gateway status:', error);
      throw error;
    }
  }

  // Update gateway configuration
  updateGatewayConfig(config: {
    gatewayName?: string;
    accountId?: string;
    fees?: Partial<typeof this.processingFees>;
  }) {
    if (config.gatewayName) this.gatewayName = config.gatewayName;
    if (config.accountId) this.gatewayAccountId = config.accountId;
    if (config.fees) {
      this.processingFees = { ...this.processingFees, ...config.fees };
    }
    
    console.log('💳 Gateway configuration updated:', {
      gatewayName: this.gatewayName,
      accountId: this.gatewayAccountId,
      fees: this.processingFees
    });
  }
}

export const paymentGatewayService = new PaymentGatewayService();