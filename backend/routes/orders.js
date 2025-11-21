const express = require('express');
const router = express.Router();
const { authMiddleware, adminOnly } = require('../middleware/auth');
const Order = require('../models/Order');
const Book = require('../models/Book');

router.post('/', authMiddleware, async (req,res) => {
  try {
    const { items, shippingAddress, totalPrice } = req.body;
    for(const it of items) {
      const b = await Book.findById(it.book);
      if(!b) return res.status(400).json({ message: `Book ${it.title} not found` });
      if(b.stock < it.qty) return res.status(400).json({ message: `Not enough stock for ${b.title}` });
      b.stock -= it.qty;
      await b.save();
    }
    const o = new Order({ user: req.user._id, items, shippingAddress, totalPrice });
    await o.save();
    res.status(201).json(o);
  } catch(err) { res.status(500).json({ message: err.message }); }
});

router.get('/', authMiddleware, async (req,res) => {
  try {
    if(req.user.role === 'admin') {
      const all = await Order.find().populate('user','name email').sort({createdAt:-1});
      return res.json(all);
    }
    const userOrders = await Order.find({ user: req.user._id }).sort({createdAt:-1});
    res.json(userOrders);
  } catch(err) { res.status(500).json({ message: err.message }); }
});

router.put('/:id/status', authMiddleware, adminOnly, async (req,res) => {
  try {
    const { status } = req.body;
    const o = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(o);
  } catch(err) { res.status(500).json({ message: err.message }); }
});



module.exports = router;
