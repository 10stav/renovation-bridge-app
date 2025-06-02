const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Basic test route
app.get('/', (req, res) => {
  res.json({ message: 'Renovation Bridge Automation API is running! 🚀' });
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/webhooks', require('./routes/webhooks')); // ← ADD THIS LINE

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.log('⚠️  MongoDB connection pending'));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🔗 Frontend connects to this URL`);
  console.log(`🎯 Ready for GoHighLevel + QuickBooks automation!`);
  console.log(`📡 Webhook endpoint: http://localhost:${PORT}/api/webhooks/ghl-opportunity`);
});