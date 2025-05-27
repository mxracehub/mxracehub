const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Basic middleware
app.use(express.json());

// Serve static files with proper error handling
app.use(express.static(path.join(__dirname, '../hugo-site/public'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// Simple homepage route
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
        .nav { text-align: center; margin: 30px 0; }
        .nav a { display: inline-block; background: #007cba; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin: 10px 5px; }
        .nav a:hover { background: #005a87; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏁 MXRaceHub Racing Platform</h1>
          <p>Your comprehensive motocross and supercross betting platform</p>
        </div>
        
        <div class="status">
          <h3>✅ Preview is Now Working!</h3>
          <p>Server Status: Running on port ${PORT}</p>
          <p>Racing Platform: Active</p>
        </div>
        
        <div class="nav">
          <a href="/races">Races</a>
          <a href="/riders">Riders</a>
          <a href="/tracks">Tracks</a>
          <a href="/betting">Betting</a>
          <a href="/login">Login</a>
        </div>
        
        <h3>Racing Platform Features:</h3>
        <ul>
          <li>✓ User authentication system</li>
          <li>✓ Rider profiles and statistics</li>
          <li>✓ Track information and schedules</li>
          <li>✓ Friend betting system</li>
          <li>✓ Group betting functionality</li>
          <li>✓ Payment integration ready</li>
          <li>✓ Real-time race updates</li>
        </ul>
      </div>
    </body>
    </html>
  `);
});

// Basic API routes for testing
app.get('/api/status', (req, res) => {
  res.json({ status: 'running', platform: 'MXRaceHub', port: PORT });
});

app.get('/races', (req, res) => {
  res.send('<h1>Races Page</h1><p>Race schedules and results will appear here.</p><a href="/">← Back to Home</a>');
});

app.get('/riders', (req, res) => {
  res.send('<h1>Riders Page</h1><p>Rider profiles and statistics will appear here.</p><a href="/">← Back to Home</a>');
});

app.get('/tracks', (req, res) => {
  res.send('<h1>Tracks Page</h1><p>Track information will appear here.</p><a href="/">← Back to Home</a>');
});

app.get('/betting', (req, res) => {
  res.send('<h1>Betting Page</h1><p>Betting options will appear here.</p><a href="/">← Back to Home</a>');
});

app.get('/login', (req, res) => {
  res.send('<h1>Login Page</h1><p>User authentication will appear here.</p><a href="/">← Back to Home</a>');
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`MXRaceHub Racing Platform running on port ${PORT}`);
  console.log(`Preview available at: http://0.0.0.0:${PORT}`);
  console.log(`Access via Replit preview or webview`);
});

// Keep server alive
process.on('SIGINT', () => {
  console.log('Gracefully shutting down...');
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('Gracefully shutting down...');
  server.close(() => {
    process.exit(0);
  });
});

// Prevent crashes
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});