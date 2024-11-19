import initSqlJs from 'sql.js';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_FILE = join(__dirname, 'database.sqlite');

let db;

export async function initDB() {
  try {
    const SQL = await initSqlJs();
    let buffer;

    try {
      buffer = await fs.readFile(DB_FILE);
    } catch {
      buffer = new Uint8Array(0);
    }

    db = new SQL.Database(buffer);

    // Initialize tables
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
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
        cast TEXT
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