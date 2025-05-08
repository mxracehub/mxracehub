const express = require('express');
const router = express.Router();
const { db } = require('./db');
const { users, transactions } = require('../shared/schema');
const { eq, and, lte, gte } = require('drizzle-orm');
const { membershipOptions } = require('../shared/test-accounts');
const crypto = require('crypto');

// Get Stripe instance
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

// Get available membership plans
router.get('/api/membership/plans', (req, res) => {
  try {
    res.json({
      plans: Object.values(membershipOptions)
    });
  } catch (error) {
    console.error('Error fetching membership plans:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get current membership for a user
router.get('/api/membership/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Get current membership status
    const membershipType = user.membershipType || 'free';
    const membershipExpires = user.membershipExpires;
    const isActive = membershipType !== 'free' && (!membershipExpires || new Date() < new Date(membershipExpires));
    
    // Get membership details
    const plan = membershipOptions[membershipType] || membershipOptions.free;
    
    res.json({
      userId,
      membershipType,
      plan,
      isActive,
      expiresAt: membershipExpires,
      daysRemaining: membershipExpires ? 
        Math.max(0, Math.ceil((new Date(membershipExpires) - new Date()) / (1000 * 60 * 60 * 24))) : 
        0
    });
  } catch (error) {
    console.error('Error fetching membership:', error);
    res.status(500).json({ error: error.message });
  }
});

// Change membership plan
router.post('/api/membership/subscribe', async (req, res) => {
  try {
    const { userId, planId } = req.body;
    
    if (!userId || !planId) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    // Validate plan exists
    const plan = membershipOptions[planId];
    if (!plan) {
      return res.status(400).json({ error: 'Invalid plan ID' });
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
    
    // If plan is free, just update user record (downgrade)
    if (planId === 'free') {
      await db
        .update(users)
        .set({ 
          membershipType: 'free',
          membershipExpires: null,
          updatedAt: new Date()
        })
        .where(eq(users.id, userId));
      
      return res.json({
        success: true,
        membershipType: 'free',
        message: 'Membership successfully changed to free plan'
      });
    }
    
    // For paid plans, create a subscription using Stripe
    const stripe = getStripeInstance();
    
    // If user doesn't have a Stripe customer ID, create one
    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username,
        metadata: {
          userId: user.id.toString()
        }
      });
      
      customerId = customer.id;
      
      // Update user with new customer ID
      await db
        .update(users)
        .set({ stripeCustomerId: customerId })
        .where(eq(users.id, userId));
    }
    
    // Calculate subscription duration and expiration
    const durationDays = planId === 'monthly' ? 30 : 365; // monthly or yearly
    const expiresAt = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000);
    
    // Create a payment intent for the subscription
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(plan.price * 100), // Convert to cents
      currency: 'usd',
      customer: customerId,
      metadata: {
        userId: userId.toString(),
        planId,
        membershipType: planId
      }
    });
    
    // Record the transaction
    const referenceId = crypto.randomUUID();
    await db
      .insert(transactions)
      .values({
        userId,
        amount: -plan.price, // Negative because it's a payment
        type: 'membership_subscription',
        status: 'pending',
        stripePaymentId: paymentIntent.id,
      });
    
    // Return client secret for frontend to complete payment
    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      planId,
      price: plan.price,
      expiresAt
    });
  } catch (error) {
    console.error('Error subscribing to membership plan:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook for Stripe events related to membership
router.post('/api/membership/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  try {
    const stripe = getStripeInstance();
    const signature = req.headers['stripe-signature'];
    
    let event;
    
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    
    // Handle membership-related events
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      
      // Check if this is a membership payment
      if (paymentIntent.metadata && paymentIntent.metadata.membershipType) {
        const userId = parseInt(paymentIntent.metadata.userId);
        const planId = paymentIntent.metadata.planId;
        const plan = membershipOptions[planId];
        
        if (userId && plan) {
          // Calculate expiration date
          const durationDays = planId === 'monthly' ? 30 : 365;
          const expiresAt = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000);
          
          // Update user's membership
          await db
            .update(users)
            .set({ 
              membershipType: planId,
              membershipExpires: expiresAt,
              updatedAt: new Date()
            })
            .where(eq(users.id, userId));
          
          // Update transaction status
          await db
            .update(transactions)
            .set({ 
              status: 'completed',
              updatedAt: new Date()
            })
            .where(eq(transactions.stripePaymentId, paymentIntent.id));
        }
      }
    }
    
    res.json({ received: true });
  } catch (error) {
    console.error('Error handling membership webhook:', error);
    res.status(500).json({ error: error.message });
  }
});

// Admin endpoint: Get membership statistics
router.get('/api/admin/membership/stats', async (req, res) => {
  try {
    // Check for admin authorization
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized access' });
    }
    
    // Get user counts by membership type
    const users = await db.select().from(users);
    
    const stats = {
      totalUsers: users.length,
      byType: {
        free: users.filter(u => !u.membershipType || u.membershipType === 'free').length,
        monthly: users.filter(u => u.membershipType === 'monthly').length,
        yearly: users.filter(u => u.membershipType === 'yearly').length
      },
      activeSubscriptions: users.filter(u => 
        (u.membershipType === 'monthly' || u.membershipType === 'yearly') && 
        u.membershipExpires && new Date(u.membershipExpires) > new Date()
      ).length,
      expiringSoon: users.filter(u => 
        (u.membershipType === 'monthly' || u.membershipType === 'yearly') && 
        u.membershipExpires && 
        new Date(u.membershipExpires) > new Date() &&
        new Date(u.membershipExpires) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Next 7 days
      ).length
    };
    
    // Get recent membership transactions
    const transactions = await db
      .select()
      .from(transactions)
      .where(eq(transactions.type, 'membership_subscription'))
      .orderBy(desc(transactions.createdAt))
      .limit(10);
    
    res.json({
      stats,
      recentTransactions: transactions
    });
  } catch (error) {
    console.error('Error fetching membership statistics:', error);
    res.status(500).json({ error: error.message });
  }
});

// Check and renew expired memberships
async function checkAndRenewMemberships() {
  try {
    // Get users with memberships expiring in the next 24 hours
    const expiringUsers = await db
      .select()
      .from(users)
      .where(
        and(
          or(eq(users.membershipType, 'monthly'), eq(users.membershipType, 'yearly')),
          gte(users.membershipExpires, new Date()),
          lte(users.membershipExpires, new Date(Date.now() + 24 * 60 * 60 * 1000))
        )
      );
    
    console.log(`Found ${expiringUsers.length} users with memberships expiring soon`);
    
    // Process each user
    for (const user of expiringUsers) {
      // In a real app, you'd send email notifications here
      console.log(`Membership for user ${user.id} is expiring on ${user.membershipExpires}`);
      
      // Check if auto-renewal is enabled (feature for future implementation)
    }
    
    // Get users with expired memberships
    const expiredUsers = await db
      .select()
      .from(users)
      .where(
        and(
          or(eq(users.membershipType, 'monthly'), eq(users.membershipType, 'yearly')),
          lte(users.membershipExpires, new Date())
        )
      );
    
    console.log(`Found ${expiredUsers.length} users with expired memberships`);
    
    // Process each expired user
    for (const user of expiredUsers) {
      // In a real app, you'd handle auto-renewal or downgrade
      console.log(`Membership for user ${user.id} has expired`);
      
      // Downgrade to free plan if auto-renewal fails
      await db
        .update(users)
        .set({ 
          membershipType: 'free',
          updatedAt: new Date()
        })
        .where(eq(users.id, user.id));
    }
  } catch (error) {
    console.error('Error checking and renewing memberships:', error);
  }
}

// Schedule membership renewal check every day
// In a real application, you'd use a proper job scheduler
setInterval(checkAndRenewMemberships, 24 * 60 * 60 * 1000);

module.exports = router;