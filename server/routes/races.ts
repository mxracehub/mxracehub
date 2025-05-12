
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

export async function updateRaces(req: Request, res: Response) {
  try {
    // Run the Python update script
    const scriptPath = path.join(process.cwd(), 'scripts/update_races.py');
    await execAsync(`python3 ${scriptPath}`);
    
    res.json({ success: true });
  } catch (error: any) {
    console.error('Failed to update races:', error);
    res.status(500).json({ error: error.message });
  }
}

export async function getRaces(req: Request, res: Response) {
  try {
    // Read races from content/races directory
    const races = await storage.getRaces();
    res.json(races);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
