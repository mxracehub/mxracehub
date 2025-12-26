import { Request, Response, NextFunction } from "express";
import { AchievementService } from "../services/achievementService";

interface AchievementRequest extends Request {
  achievementData?: {
    userId: number;
    action: string;
    data: any;
  };
}

// Middleware to automatically trigger achievements after successful actions
export const triggerAchievements = async (req: AchievementRequest, res: Response, next: NextFunction) => {
  // Store the original json method
  const originalJson = res.json;
  
  // Override res.json to trigger achievements after successful responses
  res.json = function(body: any) {
    // Only trigger achievements for successful responses (2xx status codes)
    if (res.statusCode >= 200 && res.statusCode < 300 && req.achievementData) {
      const { userId, action, data } = req.achievementData;
      
      // Trigger achievements asynchronously (don't block the response)
      setImmediate(async () => {
        try {
          switch (action) {
            case 'bet_placed':
              await AchievementService.onBetPlaced(userId, data.amount);
              break;
            case 'bet_won':
              await AchievementService.onBetWon(userId, data.winAmount);
              break;
            case 'bet_lost':
              await AchievementService.onBetLost(userId);
              break;
            case 'profile_updated':
              await AchievementService.onProfileUpdated(userId, data.completionPercentage);
              break;
            case 'friend_invited':
              await AchievementService.onFriendInvited(userId);
              break;
            case 'group_created':
              await AchievementService.onGroupCreated(userId);
              break;
            case 'user_login':
              await AchievementService.onUserLogin(userId);
              break;
            case 'user_registered':
              await AchievementService.onUserRegistered(userId);
              break;
          }
        } catch (error) {
          console.error('Achievement trigger error:', error);
        }
      });
    }
    
    // Call the original json method
    return originalJson.call(this, body);
  };
  
  next();
};

// Helper functions to set achievement data in requests
export const setBetPlacedData = (userId: number, amount: number) => {
  return (req: AchievementRequest, res: Response, next: NextFunction) => {
    req.achievementData = {
      userId,
      action: 'bet_placed',
      data: { amount }
    };
    next();
  };
};

export const setBetWonData = (userId: number, winAmount: number) => {
  return (req: AchievementRequest, res: Response, next: NextFunction) => {
    req.achievementData = {
      userId,
      action: 'bet_won',
      data: { winAmount }
    };
    next();
  };
};

export const setBetLostData = (userId: number) => {
  return (req: AchievementRequest, res: Response, next: NextFunction) => {
    req.achievementData = {
      userId,
      action: 'bet_lost',
      data: {}
    };
    next();
  };
};

export const setProfileUpdatedData = (userId: number, completionPercentage: number) => {
  return (req: AchievementRequest, res: Response, next: NextFunction) => {
    req.achievementData = {
      userId,
      action: 'profile_updated',
      data: { completionPercentage }
    };
    next();
  };
};

export const setFriendInvitedData = (userId: number) => {
  return (req: AchievementRequest, res: Response, next: NextFunction) => {
    req.achievementData = {
      userId,
      action: 'friend_invited',
      data: {}
    };
    next();
  };
};

export const setGroupCreatedData = (userId: number) => {
  return (req: AchievementRequest, res: Response, next: NextFunction) => {
    req.achievementData = {
      userId,
      action: 'group_created',
      data: {}
    };
    next();
  };
};

export const setUserLoginData = (userId: number) => {
  return (req: AchievementRequest, res: Response, next: NextFunction) => {
    req.achievementData = {
      userId,
      action: 'user_login',
      data: {}
    };
    next();
  };
};

export const setUserRegisteredData = (userId: number) => {
  return (req: AchievementRequest, res: Response, next: NextFunction) => {
    req.achievementData = {
      userId,
      action: 'user_registered',
      data: {}
    };
    next();
  };
};