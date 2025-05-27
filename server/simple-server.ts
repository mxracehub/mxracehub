import express from "express";
import cors from "cors";
import helmet from "helmet";
import { registerRoutes } from "./routes";

async function startServer() {
  const app = express();
  
  // Apply middleware
  app.use(cors());
  app.use(helmet({
    contentSecurityPolicy: false,
  }));
  app.use(express.json());
  app.use(express.static('public'));
  
  // Basic HTML page for the racing platform
  app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>MXRaceHub - Motocross & Supercross Racing Platform</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
          .container { max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; }
          h1 { color: #d97706; margin-bottom: 20px; }
          .api-section { margin: 20px 0; }
          .endpoint { background: #f8f9fa; padding: 10px; margin: 5px 0; border-radius: 4px; }
          .status { color: #059669; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🏁 MXRaceHub Racing Platform</h1>
          <div class="status">✅ Server Running Successfully!</div>
          
          <div class="api-section">
            <h3>Available API Endpoints:</h3>
            <div class="endpoint">GET /api/riders - Get all riders</div>
            <div class="endpoint">GET /api/tracks - Get all tracks</div>
            <div class="endpoint">GET /api/races - Get all races</div>
            <div class="endpoint">GET /api/races/upcoming - Get upcoming races</div>
            <div class="endpoint">POST /api/auth/register - User registration</div>
            <div class="endpoint">POST /api/auth/login - User login</div>
            <div class="endpoint">GET /api/auth/user - Get current user</div>
            <div class="endpoint">POST /api/friend-bets - Create friend bet</div>
            <div class="endpoint">GET /api/groups - Get user groups</div>
          </div>
          
          <p>Your comprehensive motocross and supercross racing platform is ready!</p>
          <p>Features include: User authentication, rider management, race tracking, betting system, and real-time updates.</p>
        </div>
      </body>
      </html>
    `);
  });
  
  // Register API routes
  const httpServer = await registerRoutes(app);
  
  const PORT = process.env.PORT || 8080;
  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`MXRaceHub server running on port ${PORT}`);
    console.log(`Access the site at: http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(console.error);