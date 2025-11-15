const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const Book = require('../models/Book');

router.post('/add', authMiddleware, async (req,res) => {
  try {
    const { bookId, qty } = req.body;
    const book = await Book.findById(bookId);
    if(!book) return res.status(404).json({ message: 'Book not found' });
    return res.json({ book: { _id: book._id, title: book.title, price: book.price, coverUrl: book.coverUrl }, qty: qty || 1 });
  } catch(err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
