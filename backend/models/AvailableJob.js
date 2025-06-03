const mongoose = require('mongoose');

const availableJobSchema = new mongoose.Schema({
  // Customer Information from GHL
  customerId: {
    type: String,
    required: true,
    unique: true // Prevent duplicate jobs for same customer
  },
  customerName: {
    type: String,
    required: true
  },
  customerEmail: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  },
  
  // Project Details
  projectBudget: {
    type: String,
    default: 'TBD'
  },
  projectDescription: {
    type: String,
    default: ''
  },
  projectTimeline: {
    type: String,
    default: 'TBD'
  },
  
  // Location
  location: {
    name: String,
    address: String,
    city: String,
    state: String,
    fullAddress: String
  },
  
  // Job Status
  status: {
    type: String,
    enum: ['available', 'claimed', 'in-progress', 'completed', 'cancelled'],
    default: 'available'
  },
  
  // Assignment Info
  claimedBy: {
    type: String,
    default: null // Contractor ID who claimed the job
  },
  claimedAt: {
    type: Date,
    default: null
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  // GHL Data
  ghlData: {
    type: Object,
    default: {}
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AvailableJob', availableJobSchema);