//create and send invoice

const axios = require('axios');

const QB_API_BASE = process.env.QUICKBOOKS_SANDBOX === 'true' 
  ? 'https://sandbox-quickbooks.api.intuit.com/v3'
  : 'https://quickbooks.api.intuit.com/v3';

// Create invoice in QuickBooks
const createQBInvoice = async (invoiceData) => {
  try {
    const {
      customerName,
      customerEmail,
      projectName,
      budget,
      appointmentDate
    } = invoiceData;

    // For now, we'll create a simple invoice structure
    // You'll need to customize this based on your QB setup
    const invoicePayload = {
      Invoice: {
        Line: [{
          Amount: budget,
          DetailType: "SalesItemLineDetail",
          SalesItemLineDetail: {
            ItemRef: {
              value: "1", // You'll need to replace with your actual item ID
              name: "Renovation Services"
            }
          },
          Description: `${projectName} - Renovation Consultation and Services`
        }],
        CustomerRef: {
          name: customerName
        },
        BillEmail: {
          Address: customerEmail
        },
        DueDate: appointmentDate,
        CustomField: [{
          DefinitionId: "1",
          Name: "Project Name",
          StringValue: projectName
        }]
      }
    };

    // Note: This is a simplified version. You'll need proper QB OAuth setup
    const response = await axios.post(
      `${QB_API_BASE}/companyid/${process.env.QUICKBOOKS_COMPANY_ID}/invoice`,
      invoicePayload,
      {
        headers: {
          'Authorization': `Bearer ${process.env.QUICKBOOKS_ACCESS_TOKEN}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ QB Invoice created:', response.data.QueryResponse.Invoice[0].Id);

    return {
      success: true,
      invoiceId: response.data.QueryResponse.Invoice[0].Id,
      invoiceNumber: response.data.QueryResponse.Invoice[0].DocNumber
    };

  } catch (error) {
    console.error('❌ QuickBooks Error:', error.response?.data || error.message);
    
    // For development, return success even if QB fails
    return {
      success: false,
      error: error.response?.data || error.message,
      mockInvoiceId: 'MOCK-' + Date.now() // Temporary for testing
    };
  }
};

module.exports = {
  createQBInvoice
};