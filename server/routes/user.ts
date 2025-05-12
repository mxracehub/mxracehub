
import { Request, Response } from 'express';
import { storage } from "../storage";
import { validateUser } from '../utils/validation';

interface FriendList {
  userId: number;
  friends: number[];
  groups: number[];
  lastUpdated: Date;
}

// Handle linking bets to user account pages
export async function handleFriendList(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const { action, friendId, groupId } = req.body;
    let friendList = await storage.getUserFriendList(req.user.id);
    
    switch (action) {
      case 'add_friend':
        await storage.addFriend(req.user.id, friendId);
        break;
      case 'remove_friend':
        await storage.removeFriend(req.user.id, friendId);
        break;
      case 'sync_group':
        await storage.syncGroupWithFriends(req.user.id, groupId);
        break;
    }

    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({
      message: "Failed to update friend list",
      error: error.message
    });
  }
}

export async function handleUserBets(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const { betId, profile, history } = req.body;
    
    if (profile) {
      await storage.saveToUserFolder(req.user.id, 'profile/bets', betId);
    }
    
    if (history) {
      await storage.saveToUserFolder(req.user.id, 'bets/history', betId);
    }
    
    res.json({ success: true });
  } catch (error: any) {
    res.status(400).json({ 
      message: "Failed to link bet",
      error: error.message 
    });
  }
}

export async function handleProfileUpdate(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const validatedData = await validateUser(req.body);
    const updatedUser = await storage.updateUser(req.user.id, validatedData);
    
    const userResponse = {
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt
    };
    
    res.json(userResponse);
  } catch (error: any) {
    res.status(400).json({ 
      message: "Failed to update profile",
      error: error.message 
    });
  }
}

export async function handleProfileGet(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const user = await storage.getUser(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userResponse = {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    res.json(userResponse);
  } catch (error: any) {
    res.status(500).json({ 
      message: "Failed to fetch profile",
      error: error.message 
    });
  }
}
