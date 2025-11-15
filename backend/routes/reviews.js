const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Book = require('../models/Book');
const { authMiddleware } = require('../middleware/auth');

router.post('/:bookId', authMiddleware, async (req,res) => {
  try {
    const { rating, comment } = req.body;
    const review = new Review({ user: req.user._id, book: req.params.bookId, rating, comment });
    await review.save();
    const stats = await Review.aggregate([
      { $match: { book: review.book } },
      { $group: { _id: '$book', avg: { $avg: '$rating' }, cnt: { $sum: 1 } } }
    ]);
    const stat = stats[0];
    await Book.findByIdAndUpdate(review.book, { rating: stat.avg, reviewsCount: stat.cnt });
    res.status(201).json(review);
  } catch(err) { res.status(500).json({ message: err.message }); }
});

router.get('/:bookId', async (req,res) => {
  try {
    const list = await Review.find({ book: req.params.bookId }).populate('user','name');
    res.json(list);
  } catch(err) { res.status(500).json({ message: err.message }); }
});

router.post('/report/:id', authMiddleware, async (req,res) => {
  try {
    await Review.findByIdAndUpdate(req.params.id, { reported: true });
    res.json({ message: 'reported' });
  } catch(err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
