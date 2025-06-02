const express = require('express');
const router = express.Router();

// GHL Webhook endpoint - UPDATED FOR GHL FORMAT
router.post('/ghl-opportunity', async (req, res) => {
  console.log('🚨 WEBHOOK HIT! ANY REQUEST RECEIVED!');
  console.log('📋 Headers:', req.headers);
  console.log('📋 Body:', req.body);
  console.log('📋 Method:', req.method);
  console.log('📋 URL:', req.url);
  
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
    
    // Notify contractors (your automation logic)
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

// Contractor notification function
async function notifyContractors(contactData) {
  console.log('📢 CONTRACTOR NOTIFICATION TRIGGERED!');
  console.log('🏗️ Project Budget:', contactData.projectBudget);
  console.log('👤 Customer:', contactData.contactName);
  console.log('📧 Email:', contactData.contactEmail);
  console.log('📱 Phone:', contactData.contactPhone);
  console.log('📝 Description:', contactData.projectDescription);
  console.log('⏰ Timeline:', contactData.projectTimeline);
  
  // TODO: 
  // 1. Store contact data in database
  // 2. Send notifications to contractors
  // 3. Create booking interface
  // 4. Trigger QuickBooks invoice ($350 to contractor)
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