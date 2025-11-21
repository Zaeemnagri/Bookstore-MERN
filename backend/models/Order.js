// backend/models/Order.js
const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  title: String,
  price: Number,
  qty: Number,
  coverUrl: String
});

const ShippingSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  address: String,
  city: String,
  postalCode: String,
  country: String
});

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [OrderItemSchema],
  shippingAddress: ShippingSchema,
  totalPrice: Number,
  status: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
