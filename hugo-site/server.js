const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const http = require('http');

// Create Express app
const app = express();

// Basic middleware
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false, // Disable for development
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// Start Hugo server in the background
console.log('Starting Hugo server...');
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

// Session middleware
const sessionOptions = {
  secret: process.env.SESSION_SECRET || 'mxracehub-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  },
};

app.use(session(sessionOptions));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Dummy API for test accounts
app.get('/api/test-accounts', (req, res) => {
  const testAccounts = [
    {
      id: 101,
      username: "test_user1",
      firstName: "John",
      lastName: "Smith",
      balance: 500.00,
      membershipType: "free"
    },
    {
      id: 102,
      username: "test_user2",
      firstName: "Sarah",
      lastName: "Johnson",
      balance: 750.00,
      membershipType: "monthly"
    }
  ];
  
  res.json(testAccounts);
});

// Betting API route
app.get('/api/betting/friend-bets/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  // Dummy response
  res.json([
    {
      id: 1001,
      creatorId: userId === 101 ? 102 : 101,
      targetId: userId,
      amount: 50,
      betType: "race_winner",
      betDetails: { raceId: 17, riderId: 18 },
      status: "pending",
      createdAt: new Date()
    }
  ]);
});

// Proxy requests to Hugo server for non-API routes
app.use((req, res, next) => {
  if (!req.path.startsWith('/api/')) {
    // Forward to Hugo server on port 3000
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: req.url,
      method: req.method,
      headers: req.headers
    };
    
    const proxyReq = http.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
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
app.listen(PORT, '0.0.0.0', () => {
  console.log(`MXRaceHub server running on port ${PORT}`);
  console.log(`Hugo server running on port 3000`);
  console.log(`Access the site at: http://localhost:${PORT}`);
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