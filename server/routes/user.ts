
import { Request, Response } from 'express';
import { storage } from "../storage";
import { validateUser } from '../utils/validation';

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
