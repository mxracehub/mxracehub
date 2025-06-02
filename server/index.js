const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

// Import routes
const bettingRoutes = require('./betting-api');
const paymentRoutes = require('./payment-api');
const withdrawalRoutes = require('./withdrawal-api');
const friendBettingRoutes = require('./friend-betting-api');
const membershipRoutes = require('./membership-api');
const { testAccounts } = require('../shared/test-accounts');

// Create Express app
const app = express();

// Basic middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

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

// Use PostgreSQL session store in production
if (process.env.NODE_ENV === 'production') {
  const pgSession = require('connect-pg-simple')(session);
  sessionOptions.store = new pgSession({
    conString: process.env.DATABASE_URL,
    tableName: 'session',
  });
}

app.use(session(sessionOptions));

// Test account authentication middleware
app.use((req, res, next) => {
  // Check for test account header
  const testAccountId = req.headers['x-test-account-id'];
  
  if (testAccountId) {
    // Find the test account
    const testAccount = testAccounts.find(account => account.id === parseInt(testAccountId));
    if (testAccount) {
      // Attach test account to request
      req.user = testAccount;
    }
  }
  
  next();
});

// Register routes
app.use(bettingRoutes);
app.use(paymentRoutes);
app.use(withdrawalRoutes);
app.use(friendBettingRoutes);
app.use(membershipRoutes);

// Special route for test accounts API
app.get('/api/test-accounts', (req, res) => {
  // Return sanitized versions of test accounts
  const sanitizedAccounts = testAccounts.map(account => ({
    id: account.id,
    username: account.username,
    firstName: account.firstName,
    lastName: account.lastName,
    balance: account.balance,
    membershipType: account.membershipType,
    membershipExpires: account.membershipExpires
  }));
  
  res.json(sanitizedAccounts);
});

// Serve static files from the Hugo site
app.use(express.static(path.join(__dirname, '../hugo-site/public')));

// Handle geolocation-based access for betting features
app.use('/api/betting', (req, res, next) => {
  // Get user's location from IP or geolocation headers
  // This would use a proper geolocation service in production
  const userCountry = req.headers['x-user-country'] || 'US';
  
  // For test mode, skip geolocation checks if test account header is present
  if (req.headers['x-test-account-id']) {
    return next();
  }
  
  // Check if betting is allowed in the user's location
  const allowedCountries = ['US', 'CA', 'UK', 'AU'];
  const allowedStates = ['NV', 'NJ', 'PA', 'MI', 'WV', 'CO', 'IN', 'TN', 'VA'];
  
  // Get user's state from headers
  const userState = req.headers['x-user-state'];
  
  if (!allowedCountries.includes(userCountry)) {
    return res.status(403).json({
      error: 'Betting service not available in your country',
      code: 'GEO_RESTRICTED'
    });
  }
  
  // For US users, check state restrictions
  if (userCountry === 'US' && userState && !allowedStates.includes(userState)) {
    return res.status(403).json({
      error: 'Betting service not available in your state',
      code: 'GEO_RESTRICTED_STATE'
    });
  }
  
  next();
});

// API error handling middleware
app.use('/api', (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong' 
      : err.message,
  });
});

// Serve any other request to the Hugo site (SPA fallback)
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api/')) {
    res.sendFile(path.join(__dirname, '../hugo-site/public/index.html'));
  } else {
    res.status(404).json({ error: 'API endpoint not found' });
  }
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Something went wrong'
      : err.message,
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`MXRaceHub server running on port ${PORT}`);
});

module.exports = app;