import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDB, saveDB } from '../db.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = getDB();
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
    await saveDB();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

router.post('/login', async (req, res) => {
  try {
      const { email, password } = req.body;
      const db = getDB();

      // Query database
      const stmt = db.prepare('SELECT id, email, password, created_at FROM users WHERE email = ?');
      let result = stmt.get([email]);

      // Handle case where result is an array
      if (result && Array.isArray(result)) {
          result = {
              id: result[0],
              email: result[1],
              password: result[2],
              createdAt: result[3]
          };
      }

      console.log('Query Result:', result);

      // Check if user exists
      if (!result) {
          return res.status(401).json({ error: 'Invalid credentials' });
      }

      console.log('Stored password:', result.password);
      console.log('Input password:', password);

      // Compare passwords
      const isMatch = await bcrypt.compare(password, result.password);
      if (!isMatch) {
          return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate token
      const token = jwt.sign(
          { userId: result.id },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
      );
      res.json({ token });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error logging in' });
  }
});


export default router;