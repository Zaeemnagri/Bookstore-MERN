

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const ordersAdminRoutes = require('./routes/ordersAdmin');
const reviewsAdminRoutes = require('./routes/reviewsAdmin');
const contactRoutes = require("./routes/contact");


dotenv.config();
const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || '' }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// connect DB
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://Bookstore:storebook123@cluster0.qrpedyn.mongodb.net/Bookstore'  ,{
  useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>console.log('MongoDB connected'))
  .catch(err=>console.error(err));

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/wishlist', require('./routes/wishlist'));
app.use('/api/admin/orders', ordersAdminRoutes);
app.use('/api/admin/reviews', reviewsAdminRoutes);


app.use("/api/contact", contactRoutes);

// fallback
app.get('/', (req,res) => res.json({ msg: 'Bookstore API' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log('Server running on', PORT));
