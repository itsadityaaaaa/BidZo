const path = require('path');
const fs = require('fs');
const { MongoClient, ObjectId } = require('mongodb');

// Keep SQLite as a fallback when MONGO_URI is not provided
let sqliteAvailable = false;
let sqliteDB = null;
try {
  const Database = require('better-sqlite3');
  sqliteAvailable = true;
  const DB_FILE = process.env.DB_FILE || path.join(__dirname, 'data', 'dev.sqlite3');

  function ensureDir(filePath) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  ensureDir(DB_FILE);
  sqliteDB = new Database(DB_FILE);
} catch (err) {
  // better-sqlite3 not installed or not available; we'll rely on Mongo if configured
  sqliteAvailable = false;
}

let mongoClient = null;
let mongoCollection = null;

// File-based fallback store when no Mongo/SQLite available
const FALLBACK_DATA_DIR = path.join(__dirname, 'data');
const FALLBACK_FILE = path.join(FALLBACK_DATA_DIR, 'messages.json');
let fallbackStore = null;
function ensureFallback() {
  if (fallbackStore) return;
  if (!fs.existsSync(FALLBACK_DATA_DIR)) fs.mkdirSync(FALLBACK_DATA_DIR, { recursive: true });
  try {
    const raw = fs.existsSync(FALLBACK_FILE) ? fs.readFileSync(FALLBACK_FILE, 'utf8') : '[]';
    fallbackStore = JSON.parse(raw || '[]');
  } catch (e) {
    fallbackStore = [];
  }
}

function persistFallback() {
  if (!fallbackStore) return;
  fs.writeFileSync(FALLBACK_FILE, JSON.stringify(fallbackStore, null, 2), 'utf8');
}

async function init() {
  if (process.env.MONGO_URI) {
    try {
      mongoClient = new MongoClient(process.env.MONGO_URI, { useUnifiedTopology: true });
      await mongoClient.connect();
      const dbName = process.env.MONGO_DB || 'bidzo';
      const db = mongoClient.db(dbName);
      mongoCollection = db.collection('messages');
      await mongoCollection.createIndex({ created_at: 1 });
      console.log('✅ Connected to MongoDB', process.env.MONGO_URI, 'DB:', dbName);
      return;
    } catch (err) {
      console.error('Failed to connect to MongoDB:', err.message);
      // fallback to sqlite if available
    }
  }

  if (sqliteAvailable && sqliteDB) {
    sqliteDB.exec(`
      CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        message TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
    `);
    console.log('✅ SQLite DB initialized as fallback');
    return;
  }
  console.warn('No database configured: set MONGO_URI for MongoDB or install better-sqlite3 for SQLite fallback. Using file fallback for development.');
  ensureFallback();
}

async function saveMessage(message) {
  const created_at = new Date().toISOString();
  if (mongoCollection) {
    const res = await mongoCollection.insertOne({ message, created_at });
    return res.insertedId.toString();
  }

  if (sqliteAvailable && sqliteDB) {
    const stmt = sqliteDB.prepare('INSERT INTO messages (message, created_at) VALUES (?, ?)');
    const info = stmt.run(message, created_at);
    // better-sqlite3 uses lastInsertRowid
    return info.lastInsertRowid || info.lastInsertRowId || (info.changes && info.lastInsertRowid) || null;
  }

  // fallback to file-based store
  ensureFallback();
  const id = Date.now().toString();
  const rec = { id, message, created_at };
  fallbackStore.push(rec);
  persistFallback();
  return id;
}

async function getMessage(id) {
  if (mongoCollection) {
    let _id = id;
    try {
      _id = new ObjectId(id);
    } catch (e) {
      // keep as-is; will fail to find
    }
    const doc = await mongoCollection.findOne({ _id });
    if (!doc) return null;
    return { id: doc._id.toString(), message: doc.message, created_at: doc.created_at };
  }

  if (sqliteAvailable && sqliteDB) {
    const stmt = sqliteDB.prepare('SELECT id, message, created_at FROM messages WHERE id = ?');
    return stmt.get(id);
  }

  // fallback to file store
  ensureFallback();
  return fallbackStore.find(m => m.id === String(id)) || null;
}

async function close() {
  if (mongoClient) await mongoClient.close();
  // sqlite3 doesn't require explicit close here
}

async function listMessages(limit = 50) {
  if (mongoCollection) {
    const docs = await mongoCollection.find({}).sort({ created_at: -1 }).limit(Number(limit)).toArray();
    return docs.map(d => ({ id: d._id.toString(), message: d.message, created_at: d.created_at }));
  }

  if (sqliteAvailable && sqliteDB) {
    const stmt = sqliteDB.prepare('SELECT id, message, created_at FROM messages ORDER BY id DESC LIMIT ?');
    return stmt.all(limit);
  }

  // fallback to file store
  ensureFallback();
  return fallbackStore.slice(-limit).reverse();
}

module.exports = { init, saveMessage, getMessage, listMessages, close };
