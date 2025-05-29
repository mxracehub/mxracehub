const express = require('express');
const router = express.Router();
const { db } = require('./db');
const { users, transactions, bets, bettingGroups } = require('../shared/schema');
const { eq, and, desc } = require('drizzle-orm');
const friendBetting = require('../shared/friend-betting');
const { testAccounts, calculateBetFee, addFeeTransaction } = require('../shared/test-accounts');

// Get all membership types for users (for fee calculation)
function getUserMembershipTypes() {
  // In a real app, this would query the database
  const membershipMap = {};
  
  // Add test accounts
  testAccounts.forEach(user => {
    membershipMap[user.id] = user.membershipType || 'free';
  });
  
  return membershipMap;
}

// Create a friend bet
router.post('/api/bets/friend', async (req, res) => {
  try {
    const { creatorId, targetId, amount, betType, betDetails, odds } = req.body;
    
    if (!creatorId || !targetId || !amount || !betType || !betDetails) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    // Validate users exist
    const creator = await db
      .select()
      .from(users)
      .where(eq(users.id, creatorId))
      .limit(1);
    
    if (!creator.length) {
      return res.status(404).json({ error: 'Creator user not found' });
    }
    
    const target = await db
      .select()
      .from(users)
      .where(eq(users.id, targetId))
      .limit(1);
    
    if (!target.length) {
      return res.status(404).json({ error: 'Target user not found' });
    }
    
    // Validate creator has enough balance
    if (creator[0].balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }
    
    // Create the bet
    const bet = friendBetting.createFriendBet(
      creatorId,
      targetId,
      amount,
      betType,
      betDetails,
      odds || 1.0
    );
    
    // For testing, also store in database
    /*
    await db
      .insert(bets)
      .values({
        userId: creatorId,
        targetUserId: targetId,
        amount,
        type: betType,
        details: JSON.stringify(betDetails),
        odds: odds || 1.0,
        status: 'pending',
        createdAt: new Date()
      });
    */
    
    res.status(201).json(bet);
  } catch (error) {
    console.error('Error creating friend bet:', error);
    res.status(500).json({ error: error.message });
  }
});

// Accept a friend bet
router.post('/api/bets/friend/:betId/accept', async (req, res) => {
  try {
    const betId = parseInt(req.params.betId);
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'Missing userId parameter' });
    }
    
    // Validate user exists
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    
    if (!user.length) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Accept the bet
    try {
      const bet = friendBetting.acceptFriendBet(betId, userId);
      
      // TODO: Update database record
      
      res.json(bet);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } catch (error) {
    console.error('Error accepting friend bet:', error);
    res.status(500).json({ error: error.message });
  }
});

// Decline a friend bet
router.post('/api/bets/friend/:betId/decline', async (req, res) => {
  try {
    const betId = parseInt(req.params.betId);
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'Missing userId parameter' });
    }
    
    // Decline the bet
    try {
      const bet = friendBetting.declineFriendBet(betId, userId);
      
      // TODO: Update database record
      
      res.json(bet);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } catch (error) {
    console.error('Error declining friend bet:', error);
    res.status(500).json({ error: error.message });
  }
});

// Cancel a friend bet
router.post('/api/bets/friend/:betId/cancel', async (req, res) => {
  try {
    const betId = parseInt(req.params.betId);
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'Missing userId parameter' });
    }
    
    // Cancel the bet
    try {
      const bet = friendBetting.cancelFriendBet(betId, userId);
      
      // TODO: Update database record
      
      res.json(bet);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } catch (error) {
    console.error('Error canceling friend bet:', error);
    res.status(500).json({ error: error.message });
  }
});

// Settle a friend bet
router.post('/api/bets/friend/:betId/settle', async (req, res) => {
  try {
    const betId = parseInt(req.params.betId);
    const { winningUserId } = req.body;
    
    if (!winningUserId) {
      return res.status(400).json({ error: 'Missing winningUserId parameter' });
    }
    
    // Get all membership types for fee calculation
    const membershipTypes = getUserMembershipTypes();
    
    // Settle the bet
    try {
      const result = friendBetting.settleFriendBet(betId, winningUserId, membershipTypes);
      
      // Update user balances
      const { bet, winnerPayout, houseFee, winningUserId: winnerId, losingUserId } = result;
      
      if (winningUserId !== 'push') {
        // Update winner balance
        await db
          .update(users)
          .set({ 
            balance: db.sql`${users.balance} + ${winnerPayout}`,
            updatedAt: new Date()
          })
          .where(eq(users.id, winnerId));
        
        // Record transaction for winner
        await db
          .insert(transactions)
          .values({
            userId: winnerId,
            amount: winnerPayout,
            type: 'bet_win',
            status: 'completed',
            stripePaymentId: bet.betHash,
          });
        
        // If there was a house fee, send it to the house account
        if (houseFee > 0) {
          await db
            .update(users)
            .set({ 
              balance: db.sql`${users.balance} + ${houseFee}`,
              updatedAt: new Date()
            })
            .where(eq(users.id, 999)); // House account ID
          
          // Record transaction for house
          await db
            .insert(transactions)
            .values({
              userId: 999, // House account
              amount: houseFee,
              type: 'bet_fee',
              status: 'completed',
              stripePaymentId: bet.betHash,
            });
        }
      } else {
        // It's a push (draw), return amounts to both users
        // Update creator balance
        await db
          .update(users)
          .set({ 
            balance: db.sql`${users.balance} + ${bet.amount}`,
            updatedAt: new Date()
          })
          .where(eq(users.id, bet.creatorId));
        
        // Record transaction for creator
        await db
          .insert(transactions)
          .values({
            userId: bet.creatorId,
            amount: bet.amount,
            type: 'bet_push',
            status: 'completed',
            stripePaymentId: bet.betHash,
          });
        
        // Update target balance
        await db
          .update(users)
          .set({ 
            balance: db.sql`${users.balance} + ${bet.amount}`,
            updatedAt: new Date()
          })
          .where(eq(users.id, bet.targetId));
        
        // Record transaction for target
        await db
          .insert(transactions)
          .values({
            userId: bet.targetId,
            amount: bet.amount,
            type: 'bet_push',
            status: 'completed',
            stripePaymentId: bet.betHash,
          });
      }
      
      // TODO: Update bet record in database
      
      res.json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } catch (error) {
    console.error('Error settling friend bet:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get pending bets for a user
router.get('/api/bets/friend/pending/:userId', (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const pendingBets = friendBetting.getPendingBets(userId);
    res.json(pendingBets);
  } catch (error) {
    console.error('Error fetching pending bets:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get active bets for a user
router.get('/api/bets/friend/active/:userId', (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const activeBets = friendBetting.getActiveBets(userId);
    res.json(activeBets);
  } catch (error) {
    console.error('Error fetching active bets:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get bet history for a user
router.get('/api/bets/friend/history/:userId', (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const betHistory = friendBetting.getBetHistory(userId);
    res.json(betHistory);
  } catch (error) {
    console.error('Error fetching bet history:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create a betting group
router.post('/api/betting/groups', async (req, res) => {
  try {
    const { name, description, ownerId, isPrivate, inviteOnly } = req.body;
    
    if (!name || !ownerId) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    // Validate owner exists
    const owner = await db
      .select()
      .from(users)
      .where(eq(users.id, ownerId))
      .limit(1);
    
    if (!owner.length) {
      return res.status(404).json({ error: 'Owner user not found' });
    }
    
    // Create the group
    const group = friendBetting.createBettingGroup(
      name,
      description,
      ownerId,
      isPrivate || false,
      inviteOnly !== false // Default to true
    );
    
    // TODO: Store in database
    
    res.status(201).json(group);
  } catch (error) {
    console.error('Error creating betting group:', error);
    res.status(500).json({ error: error.message });
  }
});

// Join a betting group
router.post('/api/betting/groups/:groupId/join', async (req, res) => {
  try {
    const groupId = parseInt(req.params.groupId);
    const { userId, inviteCode } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'Missing userId parameter' });
    }
    
    // Validate user exists
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    
    if (!user.length) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Join the group
    try {
      const group = friendBetting.joinBettingGroup(groupId, userId, inviteCode);
      
      // TODO: Update database record
      
      res.json(group);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } catch (error) {
    console.error('Error joining betting group:', error);
    res.status(500).json({ error: error.message });
  }
});

// Leave a betting group
router.post('/api/betting/groups/:groupId/leave', async (req, res) => {
  try {
    const groupId = parseInt(req.params.groupId);
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'Missing userId parameter' });
    }
    
    // Leave the group
    try {
      const group = friendBetting.leaveBettingGroup(groupId, userId);
      
      // TODO: Update database record
      
      res.json(group);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } catch (error) {
    console.error('Error leaving betting group:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create a group bet
router.post('/api/betting/groups/:groupId/bets', async (req, res) => {
  try {
    const groupId = parseInt(req.params.groupId);
    const { creatorId, betType, betDetails, options } = req.body;
    
    if (!creatorId || !betType || !betDetails || !options) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    // Validate creator exists
    const creator = await db
      .select()
      .from(users)
      .where(eq(users.id, creatorId))
      .limit(1);
    
    if (!creator.length) {
      return res.status(404).json({ error: 'Creator user not found' });
    }
    
    // Create the group bet
    try {
      const bet = friendBetting.createGroupBet(groupId, creatorId, betType, betDetails, options);
      
      // TODO: Store in database
      
      res.status(201).json(bet);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } catch (error) {
    console.error('Error creating group bet:', error);
    res.status(500).json({ error: error.message });
  }
});

// Join a group bet
router.post('/api/betting/groups/bets/:betId/join', async (req, res) => {
  try {
    const betId = parseInt(req.params.betId);
    const { userId, optionId, amount } = req.body;
    
    if (!userId || !optionId || !amount) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    // Validate user exists
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    
    if (!user.length) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if user has enough balance
    if (user[0].balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }
    
    // Get user's membership type for fee calculation
    const membershipType = user[0].membershipType || 'free';
    
    // Join the group bet
    try {
      const result = friendBetting.joinGroupBet(betId, userId, optionId, amount, membershipType);
      
      // Deduct amount from user's balance
      await db
        .update(users)
        .set({ 
          balance: db.sql`${users.balance} - ${amount}`,
          updatedAt: new Date()
        })
        .where(eq(users.id, userId));
      
      // Record transaction
      await db
        .insert(transactions)
        .values({
          userId,
          amount: -amount,
          type: 'group_bet_join',
          status: 'completed',
          stripePaymentId: `grp_${betId}_${userId}`,
        });
      
      // If there was a house fee, send it to the house account
      if (result.houseFee > 0) {
        await db
          .update(users)
          .set({ 
            balance: db.sql`${users.balance} + ${result.houseFee}`,
            updatedAt: new Date()
          })
          .where(eq(users.id, 999)); // House account ID
        
        // Record transaction for house
        await db
          .insert(transactions)
          .values({
            userId: 999, // House account
            amount: result.houseFee,
            type: 'bet_fee',
            status: 'completed',
            stripePaymentId: `fee_${betId}_${userId}`,
          });
      }
      
      // TODO: Update bet record in database
      
      res.json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } catch (error) {
    console.error('Error joining group bet:', error);
    res.status(500).json({ error: error.message });
  }
});

// Settle a group bet
router.post('/api/betting/groups/bets/:betId/settle', async (req, res) => {
  try {
    const betId = parseInt(req.params.betId);
    const { winningOptionId } = req.body;
    
    if (!winningOptionId) {
      return res.status(400).json({ error: 'Missing winningOptionId parameter' });
    }
    
    // Settle the group bet
    try {
      const result = friendBetting.settleGroupBet(betId, winningOptionId);
      
      // Process payouts
      for (const payout of result.payouts) {
        // Update user balance
        await db
          .update(users)
          .set({ 
            balance: db.sql`${users.balance} + ${payout.amount}`,
            updatedAt: new Date()
          })
          .where(eq(users.id, payout.userId));
        
        // Record transaction
        await db
          .insert(transactions)
          .values({
            userId: payout.userId,
            amount: payout.amount,
            type: 'group_bet_win',
            status: 'completed',
            stripePaymentId: `grp_win_${betId}_${payout.userId}`,
          });
      }
      
      // TODO: Update bet record in database
      
      res.json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } catch (error) {
    console.error('Error settling group bet:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all betting groups
router.get('/api/betting/groups', (req, res) => {
  try {
    // Filter out private groups unless user is a member
    const userId = parseInt(req.query.userId);
    let groups = friendBetting.bettingGroups;
    
    if (userId) {
      groups = groups.filter(group => 
        !group.isPrivate || group.members.includes(userId)
      );
    } else {
      groups = groups.filter(group => !group.isPrivate);
    }
    
    res.json(groups);
  } catch (error) {
    console.error('Error fetching betting groups:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get a specific betting group
router.get('/api/betting/groups/:groupId', (req, res) => {
  try {
    const groupId = parseInt(req.params.groupId);
    const userId = parseInt(req.query.userId);
    
    const group = friendBetting.bettingGroups.find(g => g.id === groupId);
    
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    
    // Check if user can access this group
    if (group.isPrivate && userId && !group.members.includes(userId)) {
      return res.status(403).json({ error: 'Access denied to private group' });
    }
    
    res.json(group);
  } catch (error) {
    console.error('Error fetching betting group:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get leaderboard for a betting group
router.get('/api/betting/groups/:groupId/leaderboard', (req, res) => {
  try {
    const groupId = parseInt(req.params.groupId);
    
    const group = friendBetting.bettingGroups.find(g => g.id === groupId);
    
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    
    // Convert leaderboard object to sorted array
    const leaderboardArray = Object.entries(group.leaderboard).map(([userId, stats]) => ({
      userId: parseInt(userId),
      ...stats
    }));
    
    // Sort by net profit (descending)
    leaderboardArray.sort((a, b) => b.netProfit - a.netProfit);
    
    res.json(leaderboardArray);
  } catch (error) {
    console.error('Error fetching group leaderboard:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;