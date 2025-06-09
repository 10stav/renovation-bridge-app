const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const AvailableJob = require('./models/AvailableJob');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware

// TEMPORARY DEBUG: Test MongoDB connection
console.log('🔍 DEBUG: MongoDB connection details');
console.log('📋 MONGODB_URI exists:', !!process.env.MONGODB_URI);
console.log('📋 MONGODB_URI length:', process.env.MONGODB_URI?.length);
console.log('📋 MONGODB_URI preview:', process.env.MONGODB_URI?.substring(0, 50) + '...');

mongoose.connection.on('connected', () => {
  console.log('✅ SUCCESS: Mongoose connected to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.log('❌ ERROR: Mongoose connection failed:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ WARNING: Mongoose disconnected from MongoDB');
});
//

app.use(cors());
app.use(express.json());

// Basic test route
app.get('/', (req, res) => {
  res.json({ message: 'Renovation Bridge Automation API is running! 🚀' });
});

// Available Jobs API Endpoints
app.get('/api/available-jobs', async (req, res) => {
  try {
    console.log('📋 Available jobs requested...');
    
    // Fetch available jobs from MongoDB
    const jobs = await AvailableJob.find({ status: 'available' })
      .sort({ createdAt: -1 }); // Newest first
    
    console.log('✅ Found', jobs.length, 'available jobs');
    
    // Transform the data for frontend
    const transformedJobs = jobs.map(job => ({
      id: job._id,
      customerName: job.customerName,
      email: job.customerEmail,
      phone: job.customerPhone,
      budget: job.projectBudget || '$25,000',
      projectType: 'Home Renovation',
      location: job.location?.fullAddress || job.location?.name || 'Location TBD',
      urgency: 'High',
      description: job.projectDescription || `Renovation project for ${job.customerName}`,
      dateAdded: job.createdAt,
      status: job.status
    }));

    res.json({
      success: true,
      jobs: transformedJobs,
      count: transformedJobs.length
    });
    
  } catch (error) {
    console.error('❌ Error fetching available jobs:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch available jobs'
    });
  }
});

app.get('/api/jobs-count', async (req, res) => {
  try {
    console.log('🔢 Jobs count requested...');
    
    const count = await AvailableJob.countDocuments({ status: 'available' });
    
    console.log('✅ Available jobs count:', count);
    
    res.json({
      success: true,
      count: count
    });
    
  } catch (error) {
    console.error('❌ Error getting jobs count:', error);
    res.status(500).json({
      success: false,
      count: 0
    });
  }
});

// NEW ENDPOINT: Handle job removal
app.post('/api/webhooks/ghl-opportunity-removed', async (req, res) => {
  try {
    console.log('🗑️ REMOVAL WEBHOOK HIT!');
    console.log('📋 Body:', JSON.stringify(req.body, null, 2));
    
    const webhookData = req.body;
    const customerEmail = webhookData.email || webhookData.contact?.email;
    
    if (customerEmail) {
      // ADD DEBUG CODE HERE
      console.log('🔍 Searching for email:', customerEmail);
      
      // Mark job as removed or delete it
      const result = await AvailableJob.findOneAndUpdate(
        { customerEmail: customerEmail },
        { status: 'removed' },
        { new: true }
      );
      
      // ADD MORE DEBUG HERE
      console.log('🔍 Update result:', result);
      
      if (result) {
        console.log('✅ Job marked as removed for:', customerEmail);
      } else {
        console.log('❌ No job found with email:', customerEmail);
        console.log('🔍 Trying alternative email field...');
        
        // Try looking with direct email field
        const alternativeResult = await AvailableJob.findOneAndUpdate(
          { email: customerEmail },
          { status: 'removed' },
          { new: true }
        );
        
        console.log('🔍 Alternative result:', alternativeResult);
        
        if (alternativeResult) {
          console.log('✅ Job found with alternative email field!');
        }
      }
    } else {
      console.log('❌ No email found in webhook data');
    }
    
    res.status(200).json({ success: true, message: 'Job removed successfully' });
  } catch (error) {
    console.error('❌ Removal webhook error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/webhooks', require('./routes/webhooks'));
app.use('/api/contractor', require('./routes/contractor'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.log('⚠ MongoDB connection pending'));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🔗 Frontend connects to this URL`);
  console.log(`🎯 Ready for GoHighLevel + QuickBooks automation!`);
  console.log(`📡 Webhook endpoint: http://localhost:${PORT}/api/webhooks/ghl-opportunity`);
});