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
  
  // Start Hugo server in the background
  console.log('Starting Hugo server...');
  try {
    const hugoProcess = exec('cd hugo-site && ./run-hugo.sh', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error starting Hugo server: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Hugo stderr: ${stderr}`);
      }
      console.log(`Hugo stdout: ${stdout}`);
    });
    
    // Handle process termination
    process.on('SIGINT', () => {
      console.log('Shutting down servers...');
      hugoProcess.kill();
      process.exit();
    });
    
    process.on('SIGTERM', () => {
      console.log('Shutting down servers...');
      hugoProcess.kill();
      process.exit();
    });
  } catch (error) {
    console.error("Failed to start Hugo server:", error);
  }
  
  // Register API routes and get the HTTP server
  const httpServer = await registerRoutes(app);
  
  // Proxy requests to Hugo server for non-API routes
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
  const PORT = process.env.PORT || 8080;
  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`MXRaceHub server running on port ${PORT}`);
    console.log(`Hugo server running on port 3000`);
    console.log(`Access the site at: http://localhost:${PORT}`);
  });
}

// Start the server
startServer().catch(error => {
  console.error("Failed to start server:", error);
});