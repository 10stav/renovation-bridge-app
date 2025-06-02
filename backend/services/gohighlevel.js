//add appointment to GHL

const axios = require('axios');

const GHL_API_BASE = 'https://rest.gohighlevel.com/v1';

// Create appointment in GoHighLevel
const createGHLAppointment = async (appointmentData) => {
  try {
    const {
      contactName,
      contactEmail,
      contactPhone,
      appointmentDate,
      appointmentTime,
      projectName,
      projectDescription,
      budget
    } = appointmentData;

    // First, create or update contact
    const contactResponse = await axios.post(`${GHL_API_BASE}/contacts/`, {
      name: contactName,
      email: contactEmail,
      phone: contactPhone,
      tags: ['renovation-lead', 'website-booking'],
      customFields: {
        'project_name': projectName,
        'project_budget': budget.toString(),
        'project_description': projectDescription
      }
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.GOHIGHLEVEL_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const contactId = contactResponse.data.contact.id;
    console.log('✅ GHL Contact created/updated:', contactId);

    // Create appointment
    const appointmentResponse = await axios.post(`${GHL_API_BASE}/appointments/`, {
      calendarId: process.env.GOHIGHLEVEL_CALENDAR_ID,
      contactId: contactId,
      startTime: `${appointmentDate}T${convertTo24Hour(appointmentTime)}:00.000Z`,
      endTime: `${appointmentDate}T${addHour(convertTo24Hour(appointmentTime))}:00.000Z`,
      title: `${projectName} - Renovation Consultation`,
      appointmentStatus: 'confirmed',
      assignedUserId: process.env.GOHIGHLEVEL_USER_ID,
      notes: `Project: ${projectName}\nBudget: $${budget}\nDescription: ${projectDescription}`
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.GOHIGHLEVEL_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ GHL Appointment created:', appointmentResponse.data.id);

    return {
      success: true,
      appointmentId: appointmentResponse.data.id,
      contactId: contactId
    };

  } catch (error) {
    console.error('❌ GoHighLevel Error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
};

// Helper functions
const convertTo24Hour = (time12h) => {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') hours = '00';
  if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
  return `${hours}:${minutes || '00'}`;
};

const addHour = (time24h) => {
  const [hours, minutes] = time24h.split(':');
  const newHour = parseInt(hours, 10) + 1;
  return `${newHour.toString().padStart(2, '0')}:${minutes}`;
};

module.exports = {
  createGHLAppointment
};