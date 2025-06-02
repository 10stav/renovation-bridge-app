const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Temporary in-memory user storage (for testing without MongoDB)
const users = [];

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// CREATE TEST USER ROUTE (works without MongoDB)
router.post('/create-test-user', async (req, res) => {
  try {
    // Check if test user already exists
    let user = users.find(u => u.email === 'test@renovation.com');
    
    if (user) {
      return res.json({ 
        message: 'Test user already exists', 
        user: { email: user.email, name: user.name, id: user.id } 
      });
    }

    // Create test user
    const hashedPassword = await bcrypt.hash('test123', 12);
    user = {
      id: Date.now().toString(),
      name: 'Test User',
      email: 'test@renovation.com',
      password: hashedPassword,
      phone: '555-123-4567',
      role: 'user'
    };

    users.push(user);

    res.json({ 
      message: 'Test user created successfully!', 
      user: { 
        email: user.email, 
        name: user.name,
        id: user.id 
      } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating test user', error: error.message });
  }
});

// LOGIN ROUTE (works without MongoDB)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user in memory
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user.id);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Test route
router.get('/test', (req, res) => {
  res.json({ 
    message: 'Auth route is working!',
    usersCount: users.length 
  });
});

module.exports = router;