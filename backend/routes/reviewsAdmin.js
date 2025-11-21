// backend/routes/reviewsAdmin.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review'); // adjust if path/name differs
const { authMiddleware, adminOnly } = require('../middleware/auth');

// GET all reviews (admin)
router.get('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).populate('user', 'name email').populate('book', 'title');
    res.json({ data: reviews });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a review
router.delete('/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
