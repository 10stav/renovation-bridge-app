const express = require('express');
const router = express.Router();
const { sendContractorNotification } = require('../services/emailService');
const { getActiveContractors } = require('../data/contractors');

// GHL Webhook endpoint - UPDATED WITH EMAIL NOTIFICATIONS
router.post('/ghl-opportunity', async (req, res) => {
  console.log('🚨 WEBHOOK HIT! ANY REQUEST RECEIVED!');
  console.log('📋 Headers:', req.headers);
  console.log('📋 Body:', req.body);
  
  console.log('🎯 GHL Webhook received!');
  console.log('📋 Webhook data:', JSON.stringify(req.body, null, 2));

  try {
    const webhookData = req.body;
    
    // Extract contact information from GHL format
    const contactData = {
      contactId: webhookData.contact_id,
      contactName: webhookData.full_name,
      contactEmail: webhookData.email,
      contactPhone: webhookData.phone,
      projectBudget: webhookData['Project Budget'],
      projectDescription: webhookData['Project Description '],
      projectTimeline: webhookData['Project Time Line'],
      tags: webhookData.tags,
      location: webhookData.location
    };
    
    console.log('🚨 CONTACT DATA RECEIVED!');
    console.log('📞 Notifying contractors...');
    console.log('👤 Customer:', contactData.contactName);
    console.log('💰 Budget:', contactData.projectBudget);
    console.log('📧 Email:', contactData.contactEmail);
    console.log('📱 Phone:', contactData.contactPhone);
    
    // Send email notifications to all contractors
    await notifyContractors(contactData);
    
    res.status(200).json({ 
      success: true, 
      message: 'Contractors notified successfully!',
      contact: contactData.contactName
    });
    
  } catch (error) {
    console.error('❌ Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Updated contractor notification function with real emails
async function notifyContractors(contactData) {
  console.log('📢 CONTRACTOR NOTIFICATION TRIGGERED!');
  console.log('🏗️ Project Budget:', contactData.projectBudget);
  console.log('👤 Customer:', contactData.contactName);
  console.log('📧 Email:', contactData.contactEmail);
  console.log('📱 Phone:', contactData.contactPhone);
  
  // Get all active contractors
  const contractors = getActiveContractors();
  console.log(`📬 Sending emails to ${contractors.length} contractors...`);
  
  // Send email to each contractor
  const emailPromises = contractors.map(async (contractor) => {
    console.log(`📧 Sending email to: ${contractor.name} (${contractor.email})`);
    return await sendContractorNotification(contractor.email, contactData);
  });
  
  // Wait for all emails to send
  const results = await Promise.all(emailPromises);
  
  // Log results
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`✅ Email notifications sent: ${successful} successful, ${failed} failed`);
}

// Test endpoints
router.get('/test', (req, res) => {
  res.json({ message: 'GHL Webhook endpoint is working!' });
});

router.get('/ghl-opportunity', (req, res) => {
  console.log('🔥 GET request received!');
  res.json({ message: 'GET endpoint working!' });
});

module.exports = router;