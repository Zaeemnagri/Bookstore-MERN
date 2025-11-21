const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/auth');

const secret = process.env.JWT_SECRET || 'secret123';

router.post('/register', async (req,res) => {
  try {
    const { name, email, password } = req.body;
    if(!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const exists = await User.findOne({ email });
    if(exists) return res.status(400).json({ message: 'Email already used' });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const u = new User({ name, email, passwordHash: hash });
    await u.save();
    const token = jwt.sign({ id: u._id }, secret, { expiresIn: '7d' });
    res.json({ token, name: u.name, email: u.email, role: u.role });
  } catch(err) { res.status(500).json({ message: err.message }); }
});

router.post('/login', async (req,res) => {
  try {
    const { email, password } = req.body;
    const u = await User.findOne({ email });
    if(!u) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, u.passwordHash);
    if(!ok) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: u._id }, secret, { expiresIn: '7d' });
    res.json({ token, name: u.name, email: u.email, role: u.role });
  } catch(err) { res.status(500).json({ message: err.message }); }
});

router.get('/me', authMiddleware, async (req,res) => {
  res.json({ user: req.user });
});

module.exports = router;
