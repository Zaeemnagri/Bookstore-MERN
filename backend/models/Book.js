const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, index: true },
  slug: { type: String, index: true },
  author: { type: String, required: true, index: true },
  description: String,
  price: { type: Number, default: 0 },
  category: String,
  language: String,
  stock: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  coverUrl: String,
  createdAt: { type: Date, default: Date.now }
});

bookSchema.pre('save', function(next){
  if(!this.slug && this.title) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
  }
  next();
});

module.exports = mongoose.model('Book', bookSchema);
