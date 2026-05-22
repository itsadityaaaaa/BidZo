require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';

// Middleware
app.use(cors({
  origin: CLIENT_URL,
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

app.get('/api/messages', async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 50;
  try {
    // Support both Mongo and SQLite via db layer
    if (typeof db.listMessages === 'function') {
      const rows = await db.listMessages(limit);
      res.json({ count: rows.length, messages: rows });
      return;
    }

    // Fallback: no list method available
    res.json({ count: 0, messages: [] });
  } catch (err) {
    console.error('Failed to list messages:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

app.post('/api/message', async (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const id = await db.saveMessage(message);
    const saved = await db.getMessage(id);

    res.json({
      success: true,
      id,
      message: saved ? saved.message : null,
      created_at: saved ? saved.created_at : null
    });
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Failed to save message' });
  }
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

// Start server after DB initialized
(async () => {
  try {
    await db.init();
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`📍 Health check: GET http://localhost:${PORT}/health`);
      console.log(`📍 API Info: GET http://localhost:${PORT}/api/info`);
      console.log(`📍 Message API: POST http://localhost:${PORT}/api/message`);
    });
  } catch (err) {
    console.error('Failed to initialize DB or start server:', err);
    process.exit(1);
  }
})();

module.exports = app;
