import initSqlJs from 'sql.js';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import bcrypt from 'bcryptjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_FILE = join(__dirname, 'database.sqlite');

let db;

export async function initDB() {
  try {
    const SQL = await initSqlJs();
    
    // Start with a fresh database
    db = new SQL.Database();

    // Initialize tables with admin support
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        is_admin INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS user_preferences (
        user_id INTEGER PRIMARY KEY,
        favorite_genres TEXT,
        watch_history TEXT,
        my_list TEXT,
        FOREIGN KEY (user_id) REFERENCES users (id)
      );

      CREATE TABLE IF NOT EXISTS movies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        image TEXT,
        backdrop TEXT,
        year INTEGER,
        rating REAL,
        duration TEXT,
        genres TEXT,
        cast TEXT,
        created_by INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users (id)
      );

      CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        movie_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id),
        FOREIGN KEY (movie_id) REFERENCES movies (id),
        UNIQUE(user_id, movie_id)
      );

      CREATE TABLE IF NOT EXISTS audit_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        action TEXT NOT NULL,
        entity_type TEXT NOT NULL,
        entity_id INTEGER,
        details TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      );
    `);

    // Create default admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    db.exec(`
      INSERT OR IGNORE INTO users (email, password, is_admin)
      VALUES ('admin@anirstream.com', '${hashedPassword}', 1)
    `);

    // Save the database
    const data = db.export();
    await fs.writeFile(DB_FILE, Buffer.from(data));

    return db;
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

export function getDB() {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
}

export async function saveDB() {
  if (!db) return;
  const data = db.export();
  await fs.writeFile(DB_FILE, Buffer.from(data));
}

// Utility function to log audit events
export async function logAuditEvent(userId, action, entityType, entityId, details) {
  try {
    const db = getDB();
    db.prepare(`
      INSERT INTO audit_logs (user_id, action, entity_type, entity_id, details)
      VALUES (?, ?, ?, ?, ?)
    `).run([userId, action, entityType, entityId, JSON.stringify(details)]);
    await saveDB();
  } catch (error) {
    console.error('Error logging audit event:', error);
  }
}