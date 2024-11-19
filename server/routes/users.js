import express from 'express';
import { getDB, saveDB } from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/preferences', authenticateToken, (req, res) => {
  try {
    const db = getDB();
    const preferences = db.prepare('SELECT * FROM user_preferences WHERE user_id = ?').get([req.user.userId]);
    res.json(preferences || {});
  } catch (error) {
    res.status(500).json({ error: 'Error fetching preferences' });
  }
});

router.put('/preferences', authenticateToken, async (req, res) => {
  try {
    const { favorite_genres, watch_history, my_list } = req.body;
    const db = getDB();
    
    db.run(`
      INSERT OR REPLACE INTO user_preferences (user_id, favorite_genres, watch_history, my_list)
      VALUES (?, ?, ?, ?)
    `, [req.user.userId, favorite_genres, watch_history, my_list]);
    
    await saveDB();
    res.json({ message: 'Preferences updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating preferences' });
  }
});

export default router;