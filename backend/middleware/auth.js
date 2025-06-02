const jwt = require('jsonwebtoken');

// Since we're using in-memory users (from the conversation), we need to import them
// This is a temporary fix for testing
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    console.log('🔍 Checking token:', token.substring(0, 20) + '...');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token decoded:', decoded);
    
    // For in-memory testing, create a mock user
    const user = {
      _id: decoded.userId,
      id: decoded.userId,
      name: 'Test User',
      email: 'test@renovation.com',
      phone: '555-123-4567',
      role: 'user'
    };

    req.user = user;
    console.log('✅ User authenticated:', user.email);
    next();
  } catch (error) {
    console.error('❌ Auth middleware error:', error.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;