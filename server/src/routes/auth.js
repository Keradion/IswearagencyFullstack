import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

/**
 * POST /api/auth/login
 * Body: { email, password }
 * Returns: { token, user }
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT (expires in 7 days)
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

/**
 * GET /api/auth/me
 * Returns the currently authenticated user (requires valid JWT via Authorization header)
 */
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const jwt_module = await import('jsonwebtoken');
    const decoded = jwt_module.default.verify(
      authHeader.split(' ')[1],
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ user });
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

export default router;
