import { storage } from "../storage";
import type { InsertUserAchievement, InsertActivityLog } from "@shared/schema";

interface AchievementProgress {
  [key: string]: number | string | boolean;
}

export class AchievementService {
  
  // Initialize default achievements in the database
  static async initializeDefaultAchievements() {
    const defaultAchievements = [
      {
        name: "First Bet",
        description: "Place your first bet on any race",
        category: "betting",
        icon: "🎯",
        badgeColor: "green",
        requirements: { bets_placed: 1 },
        points: 10,
        isActive: true
      },
      {
        name: "High Roller",
        description: "Place a bet worth $100 or more",
        category: "betting",
        icon: "💰",
        badgeColor: "yellow",
        requirements: { high_value_bet: 100 },
        points: 25,
        isActive: true
      },
      {
        name: "Betting Streak",
        description: "Place bets on 5 consecutive races",
        category: "betting",
        icon: "🔥",
        badgeColor: "orange",
        requirements: { betting_streak: 5 },
        points: 20,
        isActive: true
      },
      {
        name: "Lucky Winner",
        description: "Win your first bet",
        category: "predictions",
        icon: "🍀",
        badgeColor: "green",
        requirements: { winning_bets: 1 },
        points: 15,
        isActive: true
      },
      {
        name: "Race Prophet",
        description: "Correctly predict 10 race winners",
        category: "predictions",
        icon: "🔮",
        badgeColor: "purple",
        requirements: { correct_predictions: 10 },
        points: 50,
        isActive: true
      },
      {
        name: "Win Streak Master",
        description: "Win 3 bets in a row",
        category: "predictions",
        icon: "⚡",
        badgeColor: "blue",
        requirements: { win_streak: 3 },
        points: 30,
        isActive: true
      },
      {
        name: "Profile Complete",
        description: "Complete your user profile 100%",
        category: "community",
        icon: "✅",
        badgeColor: "blue",
        requirements: { profile_completion: 100 },
        points: 15,
        isActive: true
      },
      {
        name: "Friend Inviter",
        description: "Invite 5 friends to join MXRaceHub",
        category: "community",
        icon: "👥",
        badgeColor: "indigo",
        requirements: { friends_invited: 5 },
        points: 25,
        isActive: true
      },
      {
        name: "Community Builder",
        description: "Create your first betting group",
        category: "community",
        icon: "🏗️",
        badgeColor: "green",
        requirements: { groups_created: 1 },
        points: 20,
        isActive: true
      },
      {
        name: "Early Adopter",
        description: "Join MXRaceHub in its first month",
        category: "milestones",
        icon: "🚀",
        badgeColor: "red",
        requirements: { early_adopter: true },
        points: 30,
        isActive: true
      },
      {
        name: "Daily Visitor",
        description: "Log in for 7 consecutive days",
        category: "milestones",
        icon: "📅",
        badgeColor: "orange",
        requirements: { daily_login_streak: 7 },
        points: 20,
        isActive: true
      },
      {
        name: "Platform Explorer",
        description: "Visit all major sections of the site",
        category: "milestones",
        icon: "🗺️",
        badgeColor: "teal",
        requirements: { sections_visited: 5 },
        points: 15,
        isActive: true
      }
    ];

    for (const achievement of defaultAchievements) {
      try {
        await storage.createAchievement(achievement);
      } catch (error) {
        // Achievement might already exist, continue
        console.log(`Achievement "${achievement.name}" already exists or failed to create`);
      }
    }
  }

  // Check and award achievements for betting actions
  static async onBetPlaced(userId: number, betAmount: number) {
    try {
      // Get or create user stats
      let userStats = await storage.getUserStats(userId);
      if (!userStats) {
        userStats = await storage.createUserStats({
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
        });
      }

      // Update bet statistics
      const newTotalBets = userStats.totalBets + 1;
      await storage.updateUserStats(userId, { 
        totalBets: newTotalBets,
        totalPredictions: userStats.totalPredictions + 1
      });

      // Check for First Bet achievement
      if (newTotalBets === 1) {
        await this.awardAchievement(userId, "First Bet");
      }

      // Check for High Roller achievement
      if (betAmount >= 100) {
        await this.awardAchievement(userId, "High Roller");
      }

      // Check for betting streak achievements
      await this.checkBettingStreak(userId);

      // Log activity
      await storage.createActivityLog({
        userId,
        activityType: "bet_placed",
        description: `Placed bet of $${betAmount.toFixed(2)}`
      });

    } catch (error) {
      console.error("Error processing bet achievement triggers:", error);
    }
  }

  // Check and award achievements for winning bets
  static async onBetWon(userId: number, winAmount: number) {
    try {
      let userStats = await storage.getUserStats(userId);
      if (!userStats) return;

      const newWinningBets = userStats.winningBets + 1;
      const newCurrentStreak = userStats.currentStreak + 1;
      const newTotalWinnings = (parseFloat(userStats.totalWinnings) + winAmount).toFixed(2);
      const newLongestStreak = Math.max(userStats.longestStreak, newCurrentStreak);

      await storage.updateUserStats(userId, {
        winningBets: newWinningBets,
        currentStreak: newCurrentStreak,
        longestStreak: newLongestStreak,
        totalWinnings: newTotalWinnings,
        correctPredictions: userStats.correctPredictions + 1
      });

      // Check for Lucky Winner achievement
      if (newWinningBets === 1) {
        await this.awardAchievement(userId, "Lucky Winner");
      }

      // Check for Win Streak Master achievement
      if (newCurrentStreak >= 3) {
        await this.awardAchievement(userId, "Win Streak Master");
      }

      // Check for Race Prophet achievement
      if (userStats.correctPredictions + 1 >= 10) {
        await this.awardAchievement(userId, "Race Prophet");
      }

      // Log activity
      await storage.createActivityLog({
        userId,
        activityType: "bet_won",
        description: `Won bet and earned $${winAmount.toFixed(2)}`
      });

    } catch (error) {
      console.error("Error processing bet win achievement triggers:", error);
    }
  }

  // Reset win streak when user loses a bet
  static async onBetLost(userId: number) {
    try {
      await storage.updateUserStats(userId, { currentStreak: 0 });
      
      await storage.createActivityLog({
        userId,
        activityType: "bet_lost",
        description: "Bet lost - win streak reset"
      });
    } catch (error) {
      console.error("Error processing bet loss:", error);
    }
  }

  // Check and award achievements for profile completion
  static async onProfileUpdated(userId: number, completionPercentage: number) {
    try {
      await storage.updateUserStats(userId, { 
        profileCompletion: completionPercentage 
      });

      // Check for Profile Complete achievement
      if (completionPercentage >= 100) {
        await this.awardAchievement(userId, "Profile Complete");
      }

      await storage.createActivityLog({
        userId,
        activityType: "profile_updated",
        description: `Profile updated to ${completionPercentage}% complete`
      });

    } catch (error) {
      console.error("Error processing profile update achievement triggers:", error);
    }
  }

  // Check and award achievements for friend invitations
  static async onFriendInvited(userId: number) {
    try {
      let userStats = await storage.getUserStats(userId);
      if (!userStats) return;

      const newFriendsInvited = userStats.friendsInvited + 1;
      await storage.updateUserStats(userId, { 
        friendsInvited: newFriendsInvited 
      });

      // Check for Friend Inviter achievement
      if (newFriendsInvited >= 5) {
        await this.awardAchievement(userId, "Friend Inviter");
      }

      await storage.createActivityLog({
        userId,
        activityType: "friend_invited",
        description: "Invited a friend to join MXRaceHub"
      });

    } catch (error) {
      console.error("Error processing friend invitation achievement triggers:", error);
    }
  }

  // Check and award achievements for group creation
  static async onGroupCreated(userId: number) {
    try {
      await this.awardAchievement(userId, "Community Builder");
      
      await storage.createActivityLog({
        userId,
        activityType: "group_created",
        description: "Created a new betting group"
      });

    } catch (error) {
      console.error("Error processing group creation achievement triggers:", error);
    }
  }

  // Check and award achievements for daily login streaks
  static async onUserLogin(userId: number) {
    try {
      // This would need to track login dates - simplified for now
      await storage.createActivityLog({
        userId,
        activityType: "user_login",
        description: "User logged in"
      });

      // You would implement daily streak tracking here
      // For now, we'll trigger the achievement after 7 logins
      const recentLogins = await storage.getUserActivityLog(userId, 7);
      const loginCount = recentLogins.filter(log => log.activityType === "user_login").length;
      
      if (loginCount >= 7) {
        await this.awardAchievement(userId, "Daily Visitor");
      }

    } catch (error) {
      console.error("Error processing login achievement triggers:", error);
    }
  }

  // Check and award early adopter achievement
  static async onUserRegistered(userId: number) {
    try {
      const registrationDate = new Date();
      const cutoffDate = new Date('2025-02-01'); // First month cutoff
      
      if (registrationDate < cutoffDate) {
        await this.awardAchievement(userId, "Early Adopter");
      }

      await storage.createActivityLog({
        userId,
        activityType: "user_registered",
        description: "User registered on MXRaceHub"
      });

    } catch (error) {
      console.error("Error processing registration achievement triggers:", error);
    }
  }

  // Helper method to check betting streaks
  private static async checkBettingStreak(userId: number) {
    try {
      const recentActivity = await storage.getUserActivityLog(userId, 10);
      const betActivities = recentActivity.filter(log => log.activityType === "bet_placed");
      
      if (betActivities.length >= 5) {
        await this.awardAchievement(userId, "Betting Streak");
      }
    } catch (error) {
      console.error("Error checking betting streak:", error);
    }
  }

  // Core method to award an achievement to a user
  private static async awardAchievement(userId: number, achievementName: string) {
    try {
      const achievements = await storage.getAchievements();
      const achievement = achievements.find(a => a.name === achievementName);
      
      if (!achievement) {
        console.log(`Achievement "${achievementName}" not found`);
        return;
      }

      // Check if user already has this achievement
      const existing = await storage.getUserAchievement(userId, achievement.id);
      if (existing) {
        console.log(`User ${userId} already has achievement "${achievementName}"`);
        return;
      }

      // Award the achievement
      const userAchievement = await storage.createUserAchievement({
        userId,
        achievementId: achievement.id,
        progress: achievement.requirements,
        isCompleted: true
      });

      // Log the achievement unlock
      await storage.createActivityLog({
        userId,
        activityType: "achievement_unlocked",
        description: `Unlocked achievement: ${achievementName}`
      });

      console.log(`🏆 Achievement "${achievementName}" awarded to user ${userId}`);
      return userAchievement;

    } catch (error) {
      console.error(`Error awarding achievement "${achievementName}" to user ${userId}:`, error);
    }
  }

  // Update achievement progress (for gradual achievements)
  static async updateAchievementProgress(userId: number, achievementName: string, progress: AchievementProgress) {
    try {
      const achievements = await storage.getAchievements();
      const achievement = achievements.find(a => a.name === achievementName);
      
      if (!achievement) return;

      const userAchievement = await storage.getUserAchievement(userId, achievement.id);
      if (!userAchievement || userAchievement.isCompleted) return;

      // Update progress
      await storage.updateUserAchievementProgress(userAchievement.id, progress);

      // Check if achievement should be completed
      const shouldComplete = this.checkAchievementCompletion(achievement.requirements, progress);
      if (shouldComplete) {
        await storage.markAchievementCompleted(userAchievement.id);
        await this.awardAchievement(userId, achievementName);
      }

    } catch (error) {
      console.error("Error updating achievement progress:", error);
    }
  }

  // Helper method to check if achievement requirements are met
  private static checkAchievementCompletion(requirements: any, progress: AchievementProgress): boolean {
    for (const [key, requiredValue] of Object.entries(requirements)) {
      const currentValue = progress[key];
      
      if (typeof requiredValue === 'number' && typeof currentValue === 'number') {
        if (currentValue < requiredValue) return false;
      } else if (typeof requiredValue === 'boolean') {
        if (currentValue !== requiredValue) return false;
      }
    }
    return true;
  }
}

export default AchievementService;