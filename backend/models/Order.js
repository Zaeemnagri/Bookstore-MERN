const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    title: String,
    price: Number,
    qty: Number,
    coverUrl: String
  }],
  shippingAddress: {
    name: String, address: String, city: String, postalCode: String, country: String
  },
  totalPrice: Number,
  status: { type: String, enum: ['Pending','Processing','Shipped','Delivered'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
