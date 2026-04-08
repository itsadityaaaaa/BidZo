require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Routes
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'Server is running successfully'
  });
});

app.get('/api/info', (req, res) => {
  res.json({
    app: 'BidZo Backend',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

app.post('/api/message', (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  res.json({
    success: true,
    receivedMessage: message,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📍 Health check: GET http://localhost:${PORT}/health`);
  console.log(`📍 API Info: GET http://localhost:${PORT}/api/info`);
  console.log(`📍 Message API: POST http://localhost:${PORT}/api/message`);
});

module.exports = app;
