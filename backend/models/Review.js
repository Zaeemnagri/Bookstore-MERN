// backend/models/Review.js
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  rating: Number,
  comment: String
}, { timestamps: true });

module.exports = mongoose.model('Review', ReviewSchema);
