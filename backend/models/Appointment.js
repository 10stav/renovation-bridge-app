const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  // User/Customer Info
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
  
  // Appointment Details
  projectName: {
    type: String,
    required: true
  },
  projectDescription: {
    type: String,
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  appointmentTime: {
    type: String,
    required: true
  },
  
  // Project Info
  timeline: {
    type: String,
    enum: ['Beginning', '1-2 weeks', '2-4 weeks', '1+ months'],
    default: 'Beginning'
  },
  budget: {
    type: Number,
    required: true
  },
  
  // Location
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  
  // Status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  
  // Integration IDs
  ghlAppointmentId: {
    type: String,
    default: null
  },
  qbInvoiceId: {
    type: String,
    default: null
  },
  
  // Automation Status
  ghlSynced: {
    type: Boolean,
    default: false
  },
  qbInvoiceSent: {
    type: Boolean,
    default: false
  },
  
  // Notes
  notes: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);