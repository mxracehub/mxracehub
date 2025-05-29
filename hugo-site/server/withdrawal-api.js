const express = require('express');
const router = express.Router();
const { db } = require('./db');
const { users, transactions } = require('../shared/schema');
const { eq, and } = require('drizzle-orm');
const crypto = require('crypto');

// Get Stripe for bank transfers
function getStripeInstance() {
  const Stripe = require('stripe');
  const key = process.env.STRIPE_SECRET_KEY;
  
  if (!key) {
    throw new Error('No Stripe API key available');
  }
  
  return new Stripe(key, {
    apiVersion: '2023-10-16'
  });
}

// Create a bank withdrawal request
router.post('/api/withdraw/bank', async (req, res) => {
  try {
    const { userId, amount, accountId, accountLast4, accountHolder } = req.body;
    
    if (!userId || !amount || !accountId) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    // Validate the amount
    if (amount < 10) {
      return res.status(400).json({ error: 'Minimum withdrawal amount is $10' });
    }
    
    // Get user
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if user has sufficient balance
    if (user.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }
    
    // Generate a reference ID for the withdrawal
    const referenceId = crypto.randomUUID();
    
    // In a real application, we would initiate a transfer to the user's bank
    // For demo purposes, we'll create a transaction and update the user's balance
    await db.transaction(async (tx) => {
      // Create transaction record
      await tx
        .insert(transactions)
        .values({
          userId,
          amount: -amount, // Negative amount for withdrawal
          type: 'bank_withdrawal',
          status: 'processing',
          stripePaymentId: referenceId,
        });
      
      // Update user balance
      await tx
        .update(users)
        .set({ 
          balance: user.balance - amount,
          updatedAt: new Date() 
        })
        .where(eq(users.id, userId));
    });
    
    // Return success response
    res.json({
      success: true,
      referenceId,
      status: 'processing',
      amount,
      accountLast4,
      estimatedArrival: '1-3 business days'
    });
  } catch (error) {
    console.error('Error processing bank withdrawal:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create a PayPal withdrawal request
router.post('/api/withdraw/paypal', async (req, res) => {
  try {
    const { userId, amount, email } = req.body;
    
    if (!userId || !amount || !email) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    // Validate the amount
    if (amount < 10) {
      return res.status(400).json({ error: 'Minimum withdrawal amount is $10' });
    }
    
    // Validate email format
    if (!email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    // Get user
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if user has sufficient balance
    if (user.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }
    
    // Generate a reference ID for the withdrawal
    const referenceId = crypto.randomUUID();
    
    // In a real application, we would initiate a PayPal payout
    // For demo purposes, we'll create a transaction and update the user's balance
    await db.transaction(async (tx) => {
      // Create transaction record
      await tx
        .insert(transactions)
        .values({
          userId,
          amount: -amount, // Negative amount for withdrawal
          type: 'paypal_withdrawal',
          status: 'processing',
          stripePaymentId: referenceId,
        });
      
      // Update user balance
      await tx
        .update(users)
        .set({ 
          balance: user.balance - amount,
          updatedAt: new Date() 
        })
        .where(eq(users.id, userId));
    });
    
    // Return success response
    res.json({
      success: true,
      referenceId,
      status: 'processing',
      amount,
      email: email.replace(/(.{3})(.*)(@.*)/, '$1***$3'), // Mask email for privacy
      estimatedArrival: '24 hours'
    });
  } catch (error) {
    console.error('Error processing PayPal withdrawal:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create a cryptocurrency withdrawal request
router.post('/api/withdraw/crypto', async (req, res) => {
  try {
    const { userId, amount, currency, address } = req.body;
    
    if (!userId || !amount || !currency || !address) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    // Validate the amount
    if (amount < 10) {
      return res.status(400).json({ error: 'Minimum withdrawal amount is $10' });
    }
    
    // Validate address format (basic check, would be more thorough in production)
    if (address.length < 10) {
      return res.status(400).json({ error: 'Invalid wallet address' });
    }
    
    // Get user
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if user has sufficient balance
    if (user.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }
    
    // Generate a reference ID for the withdrawal
    const referenceId = crypto.randomUUID();
    
    // Mock exchange rates (in a real app, you'd fetch these from an API)
    const exchangeRates = {
      btc: 0.000034,
      eth: 0.00052,
      sol: 0.011,
      usdc: 1
    };
    
    // Calculate crypto amount
    const rate = exchangeRates[currency.toLowerCase()];
    const cryptoAmount = amount * rate;
    
    // In a real application, we would initiate a crypto transfer
    // For demo purposes, we'll create a transaction and update the user's balance
    await db.transaction(async (tx) => {
      // Create transaction record
      await tx
        .insert(transactions)
        .values({
          userId,
          amount: -amount, // Negative amount for withdrawal
          type: 'crypto_withdrawal',
          status: 'processing',
          stripePaymentId: referenceId,
        });
      
      // Update user balance
      await tx
        .update(users)
        .set({ 
          balance: user.balance - amount,
          updatedAt: new Date() 
        })
        .where(eq(users.id, userId));
    });
    
    // Return success response
    res.json({
      success: true,
      referenceId,
      status: 'processing',
      amount,
      cryptoAmount,
      currency: currency.toUpperCase(),
      address: maskWalletAddress(address),
      estimatedArrival: '1-2 hours'
    });
  } catch (error) {
    console.error('Error processing crypto withdrawal:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get withdrawal history for a user
router.get('/api/withdrawals/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    
    // Find all withdrawals for this user
    const withdrawals = await db
      .select()
      .from(transactions)
      .where(
        and(
          eq(transactions.userId, userId),
          // Match any withdrawal type
          // In a real app, you'd use a proper enum or more specific filtering
        )
      )
      .orderBy({ createdAt: 'desc' });
    
    // Filter to only include withdrawals
    const filteredWithdrawals = withdrawals.filter(tx => 
      tx.type.includes('withdrawal') && tx.amount < 0
    );
    
    res.json(filteredWithdrawals);
  } catch (error) {
    console.error('Error fetching withdrawal history:', error);
    res.status(500).json({ error: error.message });
  }
});

// Helper function to mask wallet address for privacy
function maskWalletAddress(address) {
  if (address.length <= 12) return address;
  
  const start = address.substring(0, 6);
  const end = address.substring(address.length - 4);
  
  return `${start}...${end}`;
}

module.exports = router;