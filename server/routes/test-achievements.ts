import { Router } from "express";
import { AchievementService } from "../services/achievementService";
import { storage } from "../storage";

const router = Router();

// Test endpoint to simulate betting actions
router.post("/test/bet-placed", async (req, res) => {
  try {
    const { userId, betAmount } = req.body;
    
    // Simulate placing a bet
    await AchievementService.onBetPlaced(userId, betAmount);
    
    // Get updated user stats and achievements
    const userStats = await storage.getUserStats(userId);
    const userAchievements = await storage.getUserAchievements(userId);
    
    res.json({
      success: true,
      message: `Simulated bet placement of $${betAmount} for user ${userId}`,
      userStats,
      newAchievements: userAchievements.filter(a => a.isCompleted),
      triggeredActions: [
        betAmount >= 100 ? "High Roller badge check" : null,
        userStats?.totalBets === 1 ? "First Bet badge awarded!" : null,
        "Betting streak check performed"
      ].filter(Boolean)
    });
  } catch (error) {
    console.error("Test bet placement error:", error);
    res.status(500).json({ error: "Test failed" });
  }
});

// Test endpoint to simulate winning a bet
router.post("/test/bet-won", async (req, res) => {
  try {
    const { userId, winAmount } = req.body;
    
    // Simulate winning a bet
    await AchievementService.onBetWon(userId, winAmount);
    
    // Get updated user stats and achievements
    const userStats = await storage.getUserStats(userId);
    const userAchievements = await storage.getUserAchievements(userId);
    
    res.json({
      success: true,
      message: `Simulated bet win of $${winAmount} for user ${userId}`,
      userStats,
      newAchievements: userAchievements.filter(a => a.isCompleted),
      triggeredActions: [
        userStats?.winningBets === 1 ? "Lucky Winner badge awarded!" : null,
        userStats?.currentStreak >= 3 ? "Win Streak Master badge check" : null,
        userStats?.correctPredictions >= 10 ? "Race Prophet badge check" : null
      ].filter(Boolean)
    });
  } catch (error) {
    console.error("Test bet win error:", error);
    res.status(500).json({ error: "Test failed" });
  }
});

// Test endpoint to simulate profile completion
router.post("/test/profile-updated", async (req, res) => {
  try {
    const { userId, completionPercentage } = req.body;
    
    // Simulate profile update
    await AchievementService.onProfileUpdated(userId, completionPercentage);
    
    // Get updated user stats and achievements
    const userStats = await storage.getUserStats(userId);
    const userAchievements = await storage.getUserAchievements(userId);
    
    res.json({
      success: true,
      message: `Simulated profile update to ${completionPercentage}% for user ${userId}`,
      userStats,
      newAchievements: userAchievements.filter(a => a.isCompleted),
      triggeredActions: [
        completionPercentage >= 100 ? "Profile Complete badge awarded!" : null
      ].filter(Boolean)
    });
  } catch (error) {
    console.error("Test profile update error:", error);
    res.status(500).json({ error: "Test failed" });
  }
});

// Test endpoint to simulate friend invitation
router.post("/test/friend-invited", async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Simulate friend invitation
    await AchievementService.onFriendInvited(userId);
    
    // Get updated user stats and achievements
    const userStats = await storage.getUserStats(userId);
    const userAchievements = await storage.getUserAchievements(userId);
    
    res.json({
      success: true,
      message: `Simulated friend invitation for user ${userId}`,
      userStats,
      newAchievements: userAchievements.filter(a => a.isCompleted),
      triggeredActions: [
        userStats?.friendsInvited >= 5 ? "Friend Inviter badge awarded!" : null
      ].filter(Boolean)
    });
  } catch (error) {
    console.error("Test friend invitation error:", error);
    res.status(500).json({ error: "Test failed" });
  }
});

// Test endpoint to reset user stats (for testing purposes)
router.post("/test/reset-user", async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Reset user stats
    await storage.updateUserStats(userId, {
      totalBets: 0,
      winningBets: 0,
      totalWinnings: "0.00",
      currentStreak: 0,
      longestStreak: 0,
      correctPredictions: 0,
      totalPredictions: 0,
      friendsInvited: 0,
      profileCompletion: 0
    });
    
    res.json({
      success: true,
      message: `Reset stats for user ${userId}`,
      note: "User achievements remain - only stats were reset"
    });
  } catch (error) {
    console.error("Test user reset error:", error);
    res.status(500).json({ error: "Reset failed" });
  }
});

// Get user's complete achievement status
router.get("/test/user/:userId/status", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    
    const userStats = await storage.getUserStats(userId);
    const userAchievements = await storage.getUserAchievements(userId);
    const allAchievements = await storage.getAchievements();
    const recentActivity = await storage.getUserActivityLog(userId, 10);
    
    // Calculate progress toward next achievements
    const achievementProgress = allAchievements.map(achievement => {
      const userAchievement = userAchievements.find(ua => ua.achievementId === achievement.id);
      const isCompleted = userAchievement?.isCompleted || false;
      
      let progress = 0;
      if (!isCompleted && userStats) {
        switch (achievement.name) {
          case "High Roller":
            progress = Math.min(100, (userStats.totalBets > 0 ? 50 : 0)); // Simplified for demo
            break;
          case "Race Prophet":
            progress = Math.min(100, (userStats.correctPredictions / 10) * 100);
            break;
          case "Friend Inviter":
            progress = Math.min(100, (userStats.friendsInvited / 5) * 100);
            break;
          case "Profile Complete":
            progress = userStats.profileCompletion;
            break;
          case "Win Streak Master":
            progress = Math.min(100, (userStats.currentStreak / 3) * 100);
            break;
        }
      }
      
      return {
        ...achievement,
        isCompleted,
        progress: isCompleted ? 100 : progress
      };
    });
    
    res.json({
      success: true,
      userId,
      userStats,
      achievementProgress,
      completedAchievements: userAchievements.filter(a => a.isCompleted).length,
      totalAchievements: allAchievements.length,
      recentActivity: recentActivity.map(activity => ({
        type: activity.activityType,
        description: activity.description,
        date: activity.createdAt
      }))
    });
  } catch (error) {
    console.error("Test status error:", error);
    res.status(500).json({ error: "Status check failed" });
  }
});

export { router as testAchievementsRouter };