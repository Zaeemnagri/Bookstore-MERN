// backend/routes/ordersAdmin.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { authMiddleware, adminOnly } = require('../middleware/auth');

// GET /api/admin/orders  -> list all orders (admin only)
router.get('/', authMiddleware, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate('user', 'name email');
    res.json({ data: orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/admin/orders/:id/status  -> update order status
router.put('/:id/status', authMiddleware, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;
    if(!['Pending','Shipped','Delivered','Cancelled'].includes(status)) return res.status(400).json({ message: 'Invalid status' });

    const order = await Order.findById(req.params.id);
    if(!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();

    res.json({ message: 'Status updated', order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
