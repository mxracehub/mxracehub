import { Router } from "express";
import { storage } from "../storage";
import { insertFriendBetSchema } from "@shared/schema";
import { triggerAchievements, setBetPlacedData, setBetWonData, setBetLostData } from "../middleware/achievementMiddleware";

const router = Router();

// Place a new bet with achievement triggers
router.post("/place-bet", triggerAchievements, async (req, res) => {
  try {
    const betData = insertFriendBetSchema.parse(req.body);
    const userId = betData.creatorId; // Assuming this is the user placing the bet
    const betAmount = parseFloat(betData.amount);
    
    // Set achievement data for bet placement
    setBetPlacedData(userId, betAmount)(req, res, () => {});
    
    const newBet = await storage.createFriendBet(betData);
    
    // Log the betting activity
    await storage.createActivityLog({
      userId,
      activityType: "bet_placed",
      description: `Placed ${betData.betType} bet of $${betAmount} on ${betData.betDetails}`
    });
    
    res.status(201).json({
      success: true,
      bet: newBet,
      message: "Bet placed successfully!"
    });
  } catch (error) {
    console.error("Error placing bet:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to place bet" 
    });
  }
});

// Resolve a bet (win/lose) with achievement triggers
router.patch("/resolve-bet/:betId", triggerAchievements, async (req, res) => {
  try {
    const betId = parseInt(req.params.betId);
    const { result, winnerUserId, winAmount } = req.body;
    
    const bet = await storage.getFriendBet(betId);
    if (!bet) {
      return res.status(404).json({ error: "Bet not found" });
    }
    
    // Update bet with result
    const updatedBet = await storage.updateFriendBet(betId, {
      status: "completed",
      result: result
    });
    
    // Set achievement data based on result
    if (result === "won" && winnerUserId) {
      setBetWonData(winnerUserId, winAmount || 0)(req, res, () => {});
      
      // Log win activity
      await storage.createActivityLog({
        userId: winnerUserId,
        activityType: "bet_won",
        description: `Won bet #${betId} and earned $${winAmount || 0}`
      });
    } else {
      // Handle loss for the bet creator
      setBetLostData(bet.creatorId)(req, res, () => {});
      
      // Log loss activity
      await storage.createActivityLog({
        userId: bet.creatorId,
        activityType: "bet_lost",
        description: `Lost bet #${betId}`
      });
    }
    
    res.json({
      success: true,
      bet: updatedBet,
      message: `Bet resolved as ${result}`
    });
  } catch (error) {
    console.error("Error resolving bet:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to resolve bet" 
    });
  }
});

// Get user's betting history
router.get("/user/:userId/history", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const userBets = await storage.getUserFriendBets(userId);
    
    res.json({
      success: true,
      bets: userBets
    });
  } catch (error) {
    console.error("Error fetching user betting history:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to fetch betting history" 
    });
  }
});

// Get user's betting statistics
router.get("/user/:userId/stats", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const userStats = await storage.getUserStats(userId);
    
    if (!userStats) {
      return res.json({
        success: true,
        stats: {
          totalBets: 0,
          winningBets: 0,
          totalWinnings: "0.00",
          currentStreak: 0,
          longestStreak: 0,
          winRate: 0
        }
      });
    }
    
    const winRate = userStats.totalBets > 0 
      ? ((userStats.winningBets / userStats.totalBets) * 100).toFixed(1)
      : 0;
    
    res.json({
      success: true,
      stats: {
        ...userStats,
        winRate
      }
    });
  } catch (error) {
    console.error("Error fetching user betting stats:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to fetch betting statistics" 
    });
  }
});

// Get active bets
router.get("/active", async (req, res) => {
  try {
    const activeBets = await storage.getActiveFriendBets();
    
    res.json({
      success: true,
      bets: activeBets
    });
  } catch (error) {
    console.error("Error fetching active bets:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to fetch active bets" 
    });
  }
});

// Cancel a bet
router.delete("/:betId", triggerAchievements, async (req, res) => {
  try {
    const betId = parseInt(req.params.betId);
    
    const updatedBet = await storage.updateFriendBet(betId, {
      status: "cancelled"
    });
    
    res.json({
      success: true,
      bet: updatedBet,
      message: "Bet cancelled successfully"
    });
  } catch (error) {
    console.error("Error cancelling bet:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to cancel bet" 
    });
  }
});

export { router as bettingRouter };