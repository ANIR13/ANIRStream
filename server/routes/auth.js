import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDB, saveDB, logAuditEvent } from '../db.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = getDB();
    
    // Check if user already exists
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get([email]);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)')
      .run([email, hashedPassword]);

    await saveDB();
    await logAuditEvent(result.lastInsertRowid, 'REGISTER', 'users', result.lastInsertRowid, { email });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = getDB();

    const stmt = db.prepare('SELECT id, email, password, created_at, is_admin FROM users WHERE email = ?');
      let result = stmt.get([email]);

      // Handle case where result is an array
      if (result && Array.isArray(result)) {
          result = {
              id: result[0],
              email: result[1],
              password: result[2],
              createdAt: result[3],
              isAdmin:  result[4]
          };
      }



    if (!result) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

          // Check if user exists
    if (!result) {
      return res.status(401).json({ error: 'Invalid credentials' });
    } 
    console.log('Stored password:', result.password);
    console.log('Input password:', password);
    console.log('is admin:', result.isAdmin);
    console.log('Id:', result.id);

    // Compare passwords
    const isMatch = await bcrypt.compare(password, result.password);
    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { 
        userId: result.id,
        isAdmin: result.isAdmin === 1
      },
      process.env.JWT_SECRET,
      { expiresIn: '1m' }
    );

    await logAuditEvent(result.id, 'LOGIN', 'users', result.id, { email });

    res.json({ 
      token,
      user: {
        id: result.id,
        email: result.email,
        isAdmin: result.isAdmin === 1
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

export default router;