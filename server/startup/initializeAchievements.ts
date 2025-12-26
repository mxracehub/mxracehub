import { AchievementService } from "../services/achievementService";

export async function initializeAchievementSystem() {
  try {
    console.log("🏆 Initializing Achievement System...");
    
    // Initialize default achievements in the database
    await AchievementService.initializeDefaultAchievements();
    
    console.log("✅ Achievement system initialized successfully!");
    console.log("📋 Available achievements:");
    console.log("  🎯 Betting Master: First Bet, High Roller, Betting Streak");
    console.log("  🏆 Race Prophet: Lucky Winner, Race Prophet, Win Streak Master");
    console.log("  👥 Community Champion: Profile Complete, Friend Inviter, Community Builder");
    console.log("  ⭐ Platform Pioneer: Early Adopter, Daily Visitor, Platform Explorer");
    
  } catch (error) {
    console.error("❌ Error initializing achievement system:", error);
  }
}