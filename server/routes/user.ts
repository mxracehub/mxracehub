
import { storage } from "../storage";

export async function handleProfileUpdate(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const updatedUser = await storage.updateUser(req.user.id, req.body);
    const userResponse = { ...updatedUser };
    delete userResponse.password;
    
    res.json(userResponse);
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile" });
  }
}
