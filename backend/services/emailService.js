const nodemailer = require('nodemailer');

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send contractor notification email
const sendContractorNotification = async (contractorEmail, customerData) => {
  const emailTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #313bc0;">🏗️ New Project Available!</h2>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Customer Details:</h3>
        <p><strong>Name:</strong> ${customerData.contactName}</p>
        <p><strong>Email:</strong> ${customerData.contactEmail}</p>
        <p><strong>Phone:</strong> ${customerData.contactPhone}</p>
        <p><strong>Project Budget:</strong> ${customerData.projectBudget}</p>
        <p><strong>Project Description:</strong> ${customerData.projectDescription || 'Details to be discussed'}</p>
        <p><strong>Timeline:</strong> ${customerData.projectTimeline || 'To be determined'}</p>
      </div>
      
      <div style="background-color: #313bc0; color: white; padding: 15px; border-radius: 8px; text-align: center;">
        <h3>Action Required</h3>
        <p>A new customer needs to book an appointment. Please respond if you're available to take this project.</p>
      </div>
      
      <p style="color: #666; font-size: 12px; margin-top: 30px;">
        This is an automated notification from Renovation Bridge.
      </p>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: contractorEmail,
    subject: '🏗️ New Project Available - Customer Needs Booking',
    html: emailTemplate,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to contractor: ${contractorEmail}`);
    return { success: true };
  } catch (error) {
    console.error(`❌ Email failed to: ${contractorEmail}`, error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendContractorNotification,
};