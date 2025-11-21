const jwt = require('jsonwebtoken');
const User = require('../models/User');
const secret = process.env.JWT_SECRET || 'secret123';

async function authMiddleware(req,res,next){
  const auth = req.headers.authorization;
  if(!auth) return res.status(401).json({ message: 'No token' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, secret);
    req.user = await User.findById(payload.id).select('-passwordHash');
    if(!req.user) return res.status(401).json({ message: 'Invalid token' });
    next();
  } catch(err){
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

function adminOnly(req,res,next){
  if(!req.user) return res.status(401).json({ message: 'Unauthorized' });
  if(req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  next();
}

module.exports = { authMiddleware, adminOnly };
