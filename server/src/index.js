import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import blogRoutes from './routes/blog.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:4173'],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));

// ── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);

// ── Health check ────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── Temporary Seed Route (For Render Free Tier) ──────────────────────────────
import bcrypt from 'bcryptjs';
import User from './models/User.js';

app.get('/api/seed', async (req, res) => {
  try {
    const ADMIN_EMAIL = 'mesfin@iswearagency.com';
    const ADMIN_PASSWORD = 'mesfin@iswear';
    
    const existing = await User.findOne({ email: ADMIN_EMAIL });
    if (existing) {
      return res.json({ message: 'Admin user already exists!', email: ADMIN_EMAIL });
    }

    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await User.create({
      email: ADMIN_EMAIL,
      passwordHash,
      role: 'admin',
      name: 'Mesfin',
    });

    res.json({ message: '✅ Admin user created successfully!', email: ADMIN_EMAIL });
  } catch (err) {
    res.status(500).json({ error: 'Seed failed: ' + err.message });
  }
});

// ── 404 handler ─────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ── Global error handler ─────────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ── Database & Start ─────────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI, { family: 4 })
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
