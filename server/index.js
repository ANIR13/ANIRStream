import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { initDB } from './db.js';
import authRoutes from './routes/auth.js';
import movieRoutes from './routes/movies.js';
import userRoutes from './routes/users.js';
import favoriteRoutes from './routes/favorites.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();

// Security and optimization middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Initialize database before setting up routes
await initDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/users', userRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});