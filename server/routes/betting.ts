
import { storage } from "../storage";
import { validateUser } from "../utils/validation";

export async function handleHoleshotBet(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const betData = {
      userId: req.user.id,
      type: 'holeshot',
      ...req.body
    };

    const savedBet = await storage.saveBet(betData);
    
    // Save to user's betting history folder
    await storage.saveToUserFolder(req.user.id, 'betting/holeshot', savedBet);
    
    res.json(savedBet);
  } catch (error: any) {
    res.status(400).json({ 
      message: "Failed to place holeshot bet",
      error: error.message 
    });
  }
}
