const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static('public'));
app.use('/static', express.static('static'));

// Parse JSON bodies
app.use(express.json());

// Serve HTML files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});