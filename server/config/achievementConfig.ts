// Achievement Configuration - Easy to adjust badge requirements
export const ACHIEVEMENT_CONFIG = {
  // 🎯 Betting Master Badges
  FIRST_BET: {
    name: "First Bet",
    description: "Place your first bet on any race",
    category: "betting",
    icon: "🎯",
    requirements: { bets_placed: 1 },
    points: 10
  },
  
  HIGH_ROLLER: {
    name: "High Roller", 
    description: "Place a bet worth $100 or more",
    category: "betting",
    icon: "💰",
    requirements: { high_value_bet: 100 }, // Easy to adjust: change to 50, 200, etc.
    points: 25
  },
  
  BETTING_STREAK: {
    name: "Betting Streak",
    description: "Place bets on 5 consecutive races",
    category: "betting", 
    icon: "🔥",
    requirements: { betting_streak: 5 }, // Easy to adjust: change to 3, 7, 10, etc.
    points: 20
  },

  // 🏆 Race Prophet Badges  
  LUCKY_WINNER: {
    name: "Lucky Winner",
    description: "Win your first bet",
    category: "predictions",
    icon: "🍀", 
    requirements: { winning_bets: 1 },
    points: 15
  },
  
  RACE_PROPHET: {
    name: "Race Prophet",
    description: "Correctly predict 10 race winners",
    category: "predictions",
    icon: "🔮",
    requirements: { correct_predictions: 10 }, // Easy to adjust: change to 5, 15, 20, etc.
    points: 50
  },
  
  WIN_STREAK_MASTER: {
    name: "Win Streak Master", 
    description: "Win 3 bets in a row",
    category: "predictions",
    icon: "⚡",
    requirements: { win_streak: 3 }, // Easy to adjust: change to 2, 5, etc.
    points: 30
  },

  // 👥 Community Champion Badges
  PROFILE_COMPLETE: {
    name: "Profile Complete",
    description: "Complete your user profile 100%",
    category: "community",
    icon: "✅",
    requirements: { profile_completion: 100 }, // Easy to adjust: change to 80, 90, etc.
    points: 15
  },
  
  FRIEND_INVITER: {
    name: "Friend Inviter",
    description: "Invite 5 friends to join MXRaceHub", 
    category: "community",
    icon: "👥",
    requirements: { friends_invited: 5 }, // Easy to adjust: change to 3, 10, etc.
    points: 25
  },
  
  COMMUNITY_BUILDER: {
    name: "Community Builder",
    description: "Create your first betting group",
    category: "community", 
    icon: "🏗️",
    requirements: { groups_created: 1 },
    points: 20
  },

  // ⭐ Platform Pioneer Badges
  EARLY_ADOPTER: {
    name: "Early Adopter",
    description: "Join MXRaceHub in its first month",
    category: "milestones",
    icon: "🚀", 
    requirements: { early_adopter: true },
    points: 30
  },
  
  DAILY_VISITOR: {
    name: "Daily Visitor",
    description: "Log in for 7 consecutive days",
    category: "milestones",
    icon: "📅",
    requirements: { daily_login_streak: 7 }, // Easy to adjust: change to 3, 14, 30, etc.
    points: 20
  },
  
  PLATFORM_EXPLORER: {
    name: "Platform Explorer", 
    description: "Visit all major sections of the site",
    category: "milestones",
    icon: "🗺️",
    requirements: { sections_visited: 5 }, // Easy to adjust: change to 3, 7, etc.
    points: 15
  }
};

// Helper function to get all achievement configs as array
export function getAllAchievementConfigs() {
  return Object.values(ACHIEVEMENT_CONFIG);
}

// Helper function to get achievement config by name
export function getAchievementConfig(name: string) {
  return Object.values(ACHIEVEMENT_CONFIG).find(config => config.name === name);
}