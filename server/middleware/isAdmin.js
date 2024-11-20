import { getDB } from '../db.js';

export function isAdmin(req, res, next) {
  try {
    const db = getDB();
    const user = db.prepare('SELECT is_admin FROM users WHERE id = ?').get([req.user.userId]);

    if (!user?.is_admin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Error checking admin status' });
  }
}