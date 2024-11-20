import express from 'express';
import { getDB, saveDB } from '../db.js';
import { authenticateToken } from '../middleware/auth.js';
import { clearCache } from '../cache.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();

// Admin-only routes
router.use(authenticateToken, isAdmin);

// Add new movie
router.post('/movies', async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      backdrop,
      year,
      rating,
      duration,
      genres,
      cast
    } = req.body;

    const db = getDB();
    
    const result = db.prepare(`
      INSERT INTO movies (title, description, image, backdrop, year, rating, duration, genres, cast)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run([
      title,
      description,
      image,
      backdrop,
      year,
      rating,
      duration,
      JSON.stringify(genres),
      JSON.stringify(cast)
    ]);

    await saveDB();
    clearCache('/api/movies');
    
    res.status(201).json({
      message: 'Movie added successfully',
      movieId: result.lastInsertRowid
    });
  } catch (error) {
    res.status(500).json({ error: 'Error adding movie' });
  }
});

// Update movie
router.put('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      image,
      backdrop,
      year,
      rating,
      duration,
      genres,
      cast
    } = req.body;

    const db = getDB();
    
    db.prepare(`
      UPDATE movies
      SET title = ?, description = ?, image = ?, backdrop = ?,
          year = ?, rating = ?, duration = ?, genres = ?, cast = ?
      WHERE id = ?
    `).run([
      title,
      description,
      image,
      backdrop,
      year,
      rating,
      duration,
      JSON.stringify(genres),
      JSON.stringify(cast),
      id
    ]);

    await saveDB();
    clearCache('/api/movies');
    clearCache(`/api/movies/${id}`);
    
    res.json({ message: 'Movie updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating movie' });
  }
});

// Delete movie
router.delete('/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();
    
    // Delete movie and related favorites
    db.prepare('DELETE FROM favorites WHERE movie_id = ?').run([id]);
    db.prepare('DELETE FROM movies WHERE id = ?').run([id]);

    await saveDB();
    clearCache('/api/movies');
    clearCache(`/api/movies/${id}`);
    
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting movie' });
  }
});

export default router;