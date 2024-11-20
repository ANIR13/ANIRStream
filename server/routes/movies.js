import express from 'express';
import { getDB } from '../db.js';
import { authenticateToken } from '../middleware/auth.js';
import { cacheMiddleware } from '../cache.js';

const router = express.Router();

// Get all movies with optional filtering
router.get('/', authenticateToken, cacheMiddleware(300), (req, res) => {
  try {
    const { genre, year, search } = req.query;
    const db = getDB();
    let query = 'SELECT * FROM movies';
    const params = [];

    if (genre || year || search) {
      const conditions = [];
      
      if (genre) {
        conditions.push('json_extract(genres, "$") LIKE ?');
        params.push(`%${genre}%`);
      }
      
      if (year) {
        conditions.push('year = ?');
        params.push(year);
      }
      
      if (search) {
        conditions.push('(title LIKE ? OR description LIKE ? OR json_extract(cast, "$") LIKE ?)');
        params.push(`%${search}%`, `%${search}%`, `%${search}%`);
      }
      
      query += ' WHERE ' + conditions.join(' AND ');
    }

    const movies = db.prepare(query).all(params);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching movies' });
  }
});

// Get movie by ID
router.get('/:id', authenticateToken, cacheMiddleware(300), (req, res) => {
  try {
    const db = getDB();
    const movie = db.prepare('SELECT * FROM movies WHERE id = ?').get([req.params.id]);
    
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching movie' });
  }
});

export default router;