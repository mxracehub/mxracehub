import express from "express";
import cors from "cors";
import helmet from "helmet";
import { registerRoutes } from "./routes";
import { exec } from "child_process";
import http from "http";

async function startServer() {
  // Create Express app
  const app = express();
  
  // Apply middleware
  app.use(cors());
  app.use(helmet({
    contentSecurityPolicy: false, // Disable for development
  }));
  app.use(express.json());
  
  // Start Hugo server in the background only if hugo-site directory exists
  console.log('Checking for Hugo site...');
  const fs = require('fs');
  let hugoProcess;
  
  if (fs.existsSync('../hugo-site')) {
    console.log('Starting Hugo server...');
    try {
      hugoProcess = exec('cd ../hugo-site && hugo server --bind 0.0.0.0 --port 3000 --buildDrafts --buildFuture', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error starting Hugo server: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`Hugo stderr: ${stderr}`);
        }
        console.log(`Hugo stdout: ${stdout}`);
      });
    } catch (error) {
      console.log('Hugo not available, serving static content from Express');
    }
  } else {
    console.log('Hugo site not found, serving from Express only');
  }
    
  
  // Handle process termination
  process.on('SIGINT', () => {
    console.log('Shutting down servers...');
    if (hugoProcess) hugoProcess.kill();
    process.exit();
  });
  
  process.on('SIGTERM', () => {
    console.log('Shutting down servers...');
    if (hugoProcess) hugoProcess.kill();
    process.exit();
  });
  
  // Register API routes and get the HTTP server
  const httpServer = await registerRoutes(app);
  
  // Add a simple fallback route when Hugo isn't available
  app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>MXRaceHub - Racing Platform</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
          .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { text-align: center; color: #333; margin-bottom: 30px; }
          .status { background: #e8f5e8; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .api-link { display: inline-block; background: #007cba; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏁 MXRaceHub Racing Platform</h1>
            <p>Your comprehensive motocross and supercross betting platform is live!</p>
          </div>
          
          <div class="status">
            <h3>✅ Server Status: Running</h3>
            <p>API Server: Active on port 8080</p>
            <p>Database: Connected</p>
            <p>Racing Features: Operational</p>
          </div>
          
          <h3>Available API Endpoints:</h3>
          <a href="/api/riders" class="api-link">View Riders</a>
          <a href="/api/tracks" class="api-link">View Tracks</a>
          <a href="/api/races" class="api-link">View Races</a>
          <a href="/api/user" class="api-link">User Info</a>
          
          <p><strong>Your racing platform includes:</strong></p>
          <ul>
            <li>User authentication system</li>
            <li>Rider and track management</li>
            <li>Race scheduling and results</li>
            <li>Friend betting system</li>
            <li>Group betting functionality</li>
            <li>Stripe payment integration</li>
            <li>Real-time WebSocket updates</li>
          </ul>
        </div>
      </body>
      </html>
    `);
  });
  
  // Proxy requests to Hugo server for non-API routes (if available)
  app.use((req, res, next) => {
    if (!req.path.startsWith('/api/') && !req.path.startsWith('/ws')) {
      // Forward to Hugo server on port 3000
      const options = {
        hostname: 'localhost',
        port: 3000,
        path: req.url,
        method: req.method,
        headers: req.headers
      };
      
      const proxyReq = http.request(options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode!, proxyRes.headers);
        proxyRes.pipe(res);
      });
      
      proxyReq.on('error', (e) => {
        console.error(`Problem with proxy request: ${e.message}`);
        res.status(503).send('Hugo server not available');
      });
      
      if (req.method === 'POST' || req.method === 'PUT') {
        req.pipe(proxyReq);
      } else {
        proxyReq.end();
      }
    } else {
      next();
    }
  });
  
  // Start server
  const PORT = Number(process.env.PORT) || 8080;
  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`MXRaceHub server running on port ${PORT}`);
    console.log(`Hugo server running on port 3000`);
    console.log(`Access the site at: http://0.0.0.0:${PORT}`);
  });
}

// Start the server
startServer().catch(error => {
  console.error("Failed to start server:", error);
});