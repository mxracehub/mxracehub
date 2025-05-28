import { Router } from "express";
import { storage } from "../storage";
import { insertAchievementSchema, insertUserAchievementSchema, insertUserStatsSchema, insertActivityLogSchema } from "@shared/schema";

const router = Router();

// Get all achievements
router.get("/", async (req, res) => {
  try {
    const achievements = await storage.getAchievements();
    res.json(achievements);
  } catch (error) {
    console.error("Error fetching achievements:", error);
    res.status(500).json({ error: "Failed to fetch achievements" });
  }
});

// Get user's achievements
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const userAchievements = await storage.getUserAchievements(userId);
    res.json(userAchievements);
  } catch (error) {
    console.error("Error fetching user achievements:", error);
    res.status(500).json({ error: "Failed to fetch user achievements" });
  }
});

// Get user's achievements by category
router.get("/user/:userId/category/:category", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const category = req.params.category;
    const userAchievements = await storage.getUserAchievementsByCategory(userId, category);
    res.json(userAchievements);
  } catch (error) {
    console.error("Error fetching user achievements by category:", error);
    res.status(500).json({ error: "Failed to fetch user achievements by category" });
  }
});

// Get user stats
router.get("/user/:userId/stats", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const userStats = await storage.getUserStats(userId);
    res.json(userStats);
  } catch (error) {
    console.error("Error fetching user stats:", error);
    res.status(500).json({ error: "Failed to fetch user stats" });
  }
});

// Update user achievement progress
router.patch("/user-achievement/:id/progress", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { progress } = req.body;
    
    const updatedAchievement = await storage.updateUserAchievementProgress(id, progress);
    res.json(updatedAchievement);
  } catch (error) {
    console.error("Error updating achievement progress:", error);
    res.status(500).json({ error: "Failed to update achievement progress" });
  }
});

// Mark achievement as completed
router.patch("/user-achievement/:id/complete", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    const completedAchievement = await storage.markAchievementCompleted(id);
    
    // Log the achievement completion
    await storage.createActivityLog({
      userId: completedAchievement.userId,
      activityType: "achievement_unlocked",
      description: `Unlocked achievement: ${completedAchievement.achievementId}`
    });
    
    res.json(completedAchievement);
  } catch (error) {
    console.error("Error completing achievement:", error);
    res.status(500).json({ error: "Failed to complete achievement" });
  }
});

// Create new achievement (admin only)
router.post("/", async (req, res) => {
  try {
    const achievementData = insertAchievementSchema.parse(req.body);
    const newAchievement = await storage.createAchievement(achievementData);
    res.status(201).json(newAchievement);
  } catch (error) {
    console.error("Error creating achievement:", error);
    res.status(500).json({ error: "Failed to create achievement" });
  }
});

// Award achievement to user
router.post("/award", async (req, res) => {
  try {
    const { userId, achievementId } = req.body;
    
    // Check if user already has this achievement
    const existing = await storage.getUserAchievement(userId, achievementId);
    if (existing) {
      return res.status(400).json({ error: "User already has this achievement" });
    }
    
    const userAchievementData = {
      userId,
      achievementId,
      progress: {},
      isCompleted: true
    };
    
    const newUserAchievement = await storage.createUserAchievement(userAchievementData);
    
    // Log the achievement award
    await storage.createActivityLog({
      userId,
      activityType: "achievement_unlocked",
      description: `Achievement awarded: ${achievementId}`
    });
    
    res.status(201).json(newUserAchievement);
  } catch (error) {
    console.error("Error awarding achievement:", error);
    res.status(500).json({ error: "Failed to award achievement" });
  }
});

// Get user activity log
router.get("/user/:userId/activity", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const limit = parseInt(req.query.limit as string) || 50;
    
    const activityLog = await storage.getUserActivityLog(userId, limit);
    res.json(activityLog);
  } catch (error) {
    console.error("Error fetching user activity:", error);
    res.status(500).json({ error: "Failed to fetch user activity" });
  }
});

// Initialize user stats (when user signs up)
router.post("/user/:userId/stats/initialize", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    
    const userStatsData = {
      userId,
      totalBets: 0,
      winningBets: 0,
      totalWinnings: "0.00",
      currentStreak: 0,
      longestStreak: 0,
      correctPredictions: 0,
      totalPredictions: 0,
      friendsInvited: 0,
      profileCompletion: 0
    };
    
    const newUserStats = await storage.createUserStats(userStatsData);
    res.status(201).json(newUserStats);
  } catch (error) {
    console.error("Error initializing user stats:", error);
    res.status(500).json({ error: "Failed to initialize user stats" });
  }
});

// Update user stats
router.patch("/user/:userId/stats", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const updates = req.body;
    
    const updatedStats = await storage.updateUserStats(userId, updates);
    res.json(updatedStats);
  } catch (error) {
    console.error("Error updating user stats:", error);
    res.status(500).json({ error: "Failed to update user stats" });
  }
});

export { router as achievementsRouter };