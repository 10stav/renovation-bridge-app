const express = require('express');
const auth = require('../middleware/auth');
const { createGHLAppointment } = require('../services/gohighlevel');
const { createQBInvoice } = require('../services/quickbooks');
const router = express.Router();

// In-memory storage for testing (replace with database later)
const appointments = [];

// GET /api/appointments - Get all appointments for user
router.get('/', auth, async (req, res) => {
  try {
    const userAppointments = appointments.filter(apt => apt.user === req.user.id);
    res.json(userAppointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/appointments/:id - Get specific appointment
router.get('/:id', auth, async (req, res) => {
  try {
    const appointment = appointments.find(apt => 
      apt.id === req.params.id && apt.user === req.user.id
    );
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/appointments - Create new appointment (THE AUTOMATION TRIGGER!)
router.post('/', auth, async (req, res) => {
  console.log('🔥 Starting appointment creation...');
  console.log('📝 Request data:', req.body);
  console.log('👤 User data:', req.user);

  try {
    const {
      projectName,
      projectDescription,
      appointmentDate,
      appointmentTime,
      timeline,
      budget,
      address,
      notes
    } = req.body;

    // Create appointment object (in-memory, no database)
    const appointment = {
      id: Date.now().toString(),
      user: req.user.id,
      customerName: req.user.name,
      customerEmail: req.user.email,
      customerPhone: req.user.phone || '',
      projectName,
      projectDescription,
      appointmentDate,
      appointmentTime,
      timeline,
      budget,
      address,
      notes,
      status: 'pending',
      ghlSynced: false,
      qbInvoiceSent: false,
      createdAt: new Date()
    };

    // Save to in-memory array
    appointments.push(appointment);

    console.log('📋 Appointment created (in-memory):', appointment.id);

    // 🚀 AUTOMATION MAGIC HAPPENS HERE!
    console.log('🔥 Starting automation for appointment:', appointment.id);

    try {
      // 1. Create appointment in GoHighLevel
      console.log('📅 Creating GoHighLevel appointment...');
      const ghlResult = await createGHLAppointment({
        contactName: req.user.name,
        contactEmail: req.user.email,
        contactPhone: req.user.phone || '',
        appointmentDate,
        appointmentTime,
        projectName,
        projectDescription,
        budget
      });

      console.log('📅 GHL Result:', ghlResult);

      if (ghlResult.success) {
        appointment.ghlAppointmentId = ghlResult.appointmentId;
        appointment.ghlSynced = true;
        console.log('✅ GoHighLevel appointment created:', ghlResult.appointmentId);
      } else {
        console.log('⚠️ GoHighLevel failed (expected):', ghlResult.error);
      }

      // 2. Create QuickBooks invoice
      console.log('💰 Creating QuickBooks invoice...');
      const qbResult = await createQBInvoice({
        customerName: req.user.name,
        customerEmail: req.user.email,
        projectName,
        budget,
        appointmentDate
      });

      console.log('💰 QB Result:', qbResult);

      if (qbResult.success) {
        appointment.qbInvoiceId = qbResult.invoiceId;
        appointment.qbInvoiceSent = true;
        console.log('✅ QuickBooks invoice created:', qbResult.invoiceId);
      } else {
        console.log('⚠️ QuickBooks failed (expected):', qbResult.error);
      }

      // Update appointment status
      appointment.status = 'confirmed';

      console.log('🎉 Automation completed successfully!');

    } catch (automationError) {
      console.error('❌ Automation error:', automationError.message);
      appointment.notes = `${appointment.notes || ''}\nAutomation Error: ${automationError.message}`;
    }

    res.status(201).json({
      message: 'Appointment created and automation triggered!',
      appointment: appointment,
      automation: {
        ghlSynced: appointment.ghlSynced,
        qbInvoiceSent: appointment.qbInvoiceSent
      }
    });

  } catch (error) {
    console.error('❌ Route error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT /api/appointments/:id - Update appointment
router.put('/:id', auth, async (req, res) => {
  try {
    const appointmentIndex = appointments.findIndex(apt => 
      apt.id === req.params.id && apt.user === req.user.id
    );
    
    if (appointmentIndex === -1) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    appointments[appointmentIndex] = { ...appointments[appointmentIndex], ...req.body };
    res.json(appointments[appointmentIndex]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE /api/appointments/:id - Cancel appointment
router.delete('/:id', auth, async (req, res) => {
  try {
    const appointmentIndex = appointments.findIndex(apt => 
      apt.id === req.params.id && apt.user === req.user.id
    );
    
    if (appointmentIndex === -1) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    appointments[appointmentIndex].status = 'cancelled';
    res.json({ message: 'Appointment cancelled', appointment: appointments[appointmentIndex] });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;