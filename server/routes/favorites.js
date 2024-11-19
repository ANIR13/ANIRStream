import express from 'express';
import { getDB, saveDB } from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  try {
    const db = getDB();
    const favorites = db.prepare('SELECT * FROM favorites WHERE user_id = ?').all([req.user.userId]);
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching favorites' });
  }
});

router.post('/:movieId', authenticateToken, async (req, res) => {
  try {
    const db = getDB();
    const { movieId } = req.params;

    // Check if already favorited
    const existing = db.prepare('SELECT * FROM favorites WHERE user_id = ? AND movie_id = ?')
      .get([req.user.userId, movieId]);

    if (existing) {
      return res.status(400).json({ error: 'Movie already in favorites' });
    }

    db.prepare('INSERT INTO favorites (user_id, movie_id) VALUES (?, ?)')
      .run([req.user.userId, movieId]);

    await saveDB();
    res.status(201).json({ message: 'Added to favorites' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding to favorites' });
  }
});

router.delete('/:movieId', authenticateToken, async (req, res) => {
  try {
    const db = getDB();
    const { movieId } = req.params;

    db.prepare('DELETE FROM favorites WHERE user_id = ? AND movie_id = ?')
      .run([req.user.userId, movieId]);

    await saveDB();
    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing from favorites' });
  }
});

export default router;