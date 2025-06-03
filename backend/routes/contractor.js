const express = require('express');
const router = express.Router();
const AvailableJob = require('../models/AvailableJob');
const auth = require('../middleware/auth');

// GET /api/contractor/available-jobs - Get all available jobs
router.get('/available-jobs', auth, async (req, res) => {
  try {
    console.log('📋 Contractor requesting available jobs...');
    
    // Get all available jobs (not claimed yet)
    const availableJobs = await AvailableJob.find({ 
      status: 'available' 
    }).sort({ createdAt: -1 }); // Newest first

    console.log(`✅ Found ${availableJobs.length} available jobs`);

    // Format jobs for contractor view
    const formattedJobs = availableJobs.map(job => ({
      id: job._id,
      customerName: job.customerName,
      customerEmail: job.customerEmail,
      customerPhone: job.customerPhone,
      projectBudget: job.projectBudget,
      projectDescription: job.projectDescription,
      projectTimeline: job.projectTimeline,
      location: job.location.fullAddress || 'Location TBD',
      locationDetails: job.location,
      createdAt: job.createdAt,
      urgency: getJobUrgency(job.createdAt), // Calculate urgency
      estimatedDuration: estimateJobDuration(job.projectBudget)
    }));

    res.json({
      success: true,
      count: formattedJobs.length,
      jobs: formattedJobs
    });

  } catch (error) {
    console.error('❌ Error fetching available jobs:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching available jobs',
      error: error.message 
    });
  }
});

// POST /api/contractor/claim-job/:id - Claim a job
router.post('/claim-job/:id', auth, async (req, res) => {
  try {
    const jobId = req.params.id;
    const contractorId = req.user.id;
    
    console.log(`🎯 Contractor ${contractorId} attempting to claim job ${jobId}`);

    // Find and update the job
    const job = await AvailableJob.findById(jobId);
    
    if (!job) {
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found' 
      });
    }

    if (job.status !== 'available') {
      return res.status(400).json({ 
        success: false, 
        message: 'Job is no longer available' 
      });
    }

    // Claim the job
    job.status = 'claimed';
    job.claimedBy = contractorId;
    job.claimedAt = new Date();
    await job.save();

    console.log(`✅ Job claimed successfully by contractor ${contractorId}`);

    res.json({
      success: true,
      message: 'Job claimed successfully!',
      job: {
        id: job._id,
        customerName: job.customerName,
        projectBudget: job.projectBudget,
        status: job.status
      }
    });

  } catch (error) {
    console.error('❌ Error claiming job:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error claiming job',
      error: error.message 
    });
  }
});

// GET /api/contractor/my-jobs - Get contractor's claimed jobs
router.get('/my-jobs', auth, async (req, res) => {
  try {
    const contractorId = req.user.id;
    
    const myJobs = await AvailableJob.find({ 
      claimedBy: contractorId 
    }).sort({ claimedAt: -1 });

    const formattedJobs = myJobs.map(job => ({
      id: job._id,
      customerName: job.customerName,
      projectBudget: job.projectBudget,
      location: job.location.fullAddress,
      status: job.status,
      claimedAt: job.claimedAt
    }));

    res.json({
      success: true,
      count: formattedJobs.length,
      jobs: formattedJobs
    });

  } catch (error) {
    console.error('❌ Error fetching contractor jobs:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching your jobs',
      error: error.message 
    });
  }
});

// Helper functions
function getJobUrgency(createdAt) {
  const hoursAgo = (Date.now() - new Date(createdAt)) / (1000 * 60 * 60);
  if (hoursAgo < 2) return 'HIGH';
  if (hoursAgo < 24) return 'MEDIUM';
  return 'LOW';
}

function estimateJobDuration(budget) {
  const budgetNum = parseInt(budget?.replace(/[^0-9]/g, '') || '0');
  if (budgetNum > 20000) return '2-4 weeks';
  if (budgetNum > 10000) return '1-2 weeks';
  if (budgetNum > 5000) return '3-7 days';
  return '1-3 days';
}

module.exports = router;