const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const multer = require('multer');
const { authMiddleware, adminOnly } = require('../middleware/auth');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function(req,file,cb){
    const dir = path.join(__dirname, '..', 'uploads');
    if(!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function(req,file,cb){
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random()*1E9)}${ext}`);
  }
});
const upload = multer({ storage });

router.get('/', async (req,res) => {
  try {
    const q = req.query.q || '';
    const category = req.query.category;
    const min = req.query.min ? Number(req.query.min) : null;
    const max = req.query.max ? Number(req.query.max) : null;
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 12, 100);

    const filter = {};
    if(q) filter.$or = [{ title: { $regex: q, $options: 'i' } }, { author: { $regex: q, $options: 'i' } }];
    if(category) filter.category = category;
    if(min !== null || max !== null) filter.price = {};
    if(min !== null) filter.price.$gte = min;
    if(max !== null) filter.price.$lte = max;

    const total = await Book.countDocuments(filter);
    const books = await Book.find(filter).skip((page-1)*limit).limit(limit).sort({ createdAt: -1 });

    res.json({ data: books, page, total, pages: Math.ceil(total/limit) });
  } catch(err) { res.status(500).json({ message: err.message }); }
});

router.get('/:id', async (req,res) => {
  try {
    const b = await Book.findById(req.params.id);
    if(!b) return res.status(404).json({ message: 'Not found' });
    res.json(b);
  } catch(err) { res.status(500).json({ message: err.message }); }
});

router.post('/', authMiddleware, adminOnly, upload.single('cover'), async (req,res) => {
  try {
    const body = req.body;
    if(req.file) body.coverUrl = `/uploads/${req.file.filename}`;
    const b = new Book(body);
    await b.save();
    res.status(201).json(b);
  } catch(err) { res.status(400).json({ message: err.message }); }
});

router.put('/:id', authMiddleware, adminOnly, upload.single('cover'), async (req,res) => {
  try {
    const body = req.body;
    if(req.file) body.coverUrl = `/uploads/${req.file.filename}`;
    const b = await Book.findByIdAndUpdate(req.params.id, body, { new: true });
    res.json(b);
  } catch(err) { res.status(400).json({ message: err.message }); }
});

router.delete('/:id', authMiddleware, adminOnly, async (req,res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'deleted' });
  } catch(err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
