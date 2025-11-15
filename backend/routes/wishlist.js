const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const User = require('../models/User');

router.post('/toggle/:bookId', authMiddleware, async (req,res) => {
  try {
    const user = req.user;
    const bookId = req.params.bookId;
    if(!user.wishlist) user.wishlist = [];
    const idx = (user.wishlist||[]).findIndex(b => String(b) === String(bookId));
    if(idx >= 0) user.wishlist.splice(idx,1); else user.wishlist.push(bookId);
    await user.save();
    res.json({ wishlist: user.wishlist });
  } catch(err) { res.status(500).json({ message: err.message }); }
});

router.get('/', authMiddleware, async (req,res) => {
  try {
    const u = await User.findById(req.user._id).populate('wishlist');
    res.json(u.wishlist || []);
  } catch(err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
