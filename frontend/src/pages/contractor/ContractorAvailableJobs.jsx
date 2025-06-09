import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AvailableJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch real jobs from backend
  useEffect(() => {
    fetchAvailableJobs();
  }, []);

  const fetchAvailableJobs = async () => {
    try {
      setLoading(true);
      console.log('🔍 Fetching available jobs from backend...');
      
      const response = await fetch('http://localhost:3001/api/available-jobs');
      const data = await response.json();
      
      if (data.success) {
        setJobs(data.jobs);
        console.log('✅ Loaded', data.count, 'real jobs from GHL database');
      } else {
        setError('Failed to load jobs from server');
      }
    } catch (err) {
      console.error('❌ Error fetching jobs:', err);
      setError('Error connecting to server. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptJob = (jobId) => {
    setLoading(true);
    console.log(`🎯 Contractor accepting job: ${jobId}`);
    
    // TODO: API call to accept job and move to next stage
    setTimeout(() => {
      alert('Job accepted! Customer will be notified.');
      setLoading(false);
      // Refresh jobs list
      fetchAvailableJobs();
    }, 1000);
  };

  const handleDeclineJob = (jobId) => {
    console.log(`❌ Contractor declining job: ${jobId}`);
    alert('Job declined. It will remain available for other contractors.');
  };

  const handleViewDetails = (jobId) => {
    console.log(`👁 Viewing details for job: ${jobId}`);
    // navigate(`/contractor/job-details/${jobId}`);
    alert('Job details feature coming soon!');
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency?.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  // Loading state
  if (loading && jobs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading available jobs from GHL...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Connection Error</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchAvailableJobs}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
          <div className="mt-4">
            <button 
              onClick={() => navigate('/contractor/dashboard')}
              className="text-gray-500 hover:text-gray-700"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/contractor/dashboard')} className="mr-4">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-800">Available Jobs</h1>
          <div className="flex items-center space-x-2">
            <button 
              onClick={fetchAvailableJobs}
              className="text-blue-600 hover:text-blue-700 p-1"
              title="Refresh jobs"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full">
              {jobs.length} available
            </span>
          </div>
        </div>
      </div>

      {/* Filter/Sort Bar */}
      <div className="bg-white px-6 py-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-2">
              <option>All Projects</option>
              <option>Kitchen</option>
              <option>Bathroom</option>
              <option>Outdoor</option>
            </select>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-2">
              <option>Any Budget</option>
              <option>Under $10k</option>
              <option>$10k - $20k</option>
              <option>$20k+</option>
            </select>
          </div>
          <p className="text-sm text-gray-500">
            Real data from GoHighLevel "Need to Book" pipeline
          </p>
        </div>
      </div>

      {/* Jobs List */}
      <div className="px-6 py-6">
        {jobs.length === 0 ? (
          /* Empty State - No Jobs Available */
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Jobs Available</h3>
            <p className="text-gray-500 mb-4">
              When homeowners move to "Need to Book" in GoHighLevel, they'll appear here.
            </p>
            <button 
              onClick={fetchAvailableJobs}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Refresh Jobs
            </button>
          </div>
        ) : (
          /* Jobs List - Real Data from GHL */
          jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-xl p-5 shadow-sm mb-4 border border-gray-100">
              {/* Job Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{job.projectType}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getUrgencyColor(job.urgency)}`}>
                      {job.urgency?.toUpperCase() || 'HIGH'}
                    </span>
                    <span className="text-xs text-gray-500">
                      Added {new Date(job.dateAdded).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-600">{job.budget}</div>
                  <div className="text-sm text-gray-500">Budget</div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="mb-3">
                <div className="flex items-center text-gray-600 text-sm mb-1">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {job.customerName}
                </div>
                <div className="flex items-center text-gray-600 text-sm mb-1">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {job.location}
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {job.email}
                </div>
              </div>

              {/* Project Description */}
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {job.description}
              </p>

              {/* Status Badge */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded">
                  From GHL Pipeline
                </span>
                <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                  {job.projectType}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button 
                  onClick={() => handleViewDetails(job.id)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
                >
                  View Details
                </button>
                <button 
                  onClick={() => handleDeclineJob(job.id)}
                  className="px-6 bg-red-100 text-red-700 py-3 rounded-lg font-semibold hover:bg-red-200 transition-colors duration-200"
                >
                  Pass
                </button>
                <button 
                  onClick={() => handleAcceptJob(job.id)}
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Accept Job'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AvailableJobs;