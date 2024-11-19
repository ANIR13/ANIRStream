import express from 'express';
import { getDB, saveDB } from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  try {
    const db = getDB();
    const movies = db.prepare('SELECT * FROM movies').all();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching movies' });
  }
});

router.get('/:id', authenticateToken, (req, res) => {
  try {
    const db = getDB();
    const movie = db.prepare('SELECT * FROM movies WHERE id = ?').get([req.params.id]);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching movie' });
  }
});

export default router;