import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AvailableJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock job data - will be replaced with API call
  const availableJobs = [
    {
      id: 1,
      customerName: "JOHN CUSTOMER",
      location: "Baker Street, London",
      projectType: "Kitchen Renovation",
      budget: "$25,000",
      timeline: "2-4 weeks",
      description: "Complete kitchen renovation including cabinets, countertops, and appliances. Customer looking for modern design with quality materials.",
      datePosted: "2 hours ago",
      urgency: "high",
      requiredSkills: ["Kitchen", "Plumbing", "Electrical"],
      estimatedDuration: "3 weeks"
    },
    {
      id: 2,
      customerName: "SARAH JOHNSON",
      location: "Main Street, Downtown",
      projectType: "Bathroom Remodel",
      budget: "$15,000",
      timeline: "1-2 weeks",
      description: "Master bathroom renovation with walk-in shower, new vanity, and tile work. High-end finishes preferred.",
      datePosted: "5 hours ago",
      urgency: "medium",
      requiredSkills: ["Bathroom", "Tile", "Plumbing"],
      estimatedDuration: "2 weeks"
    },
    {
      id: 3,
      customerName: "MIKE WILLIAMS",
      location: "Oak Avenue, Suburbs",
      projectType: "Deck Construction",
      budget: "$8,500",
      timeline: "1 week",
      description: "Build new composite deck in backyard. Includes railing and basic lighting installation.",
      datePosted: "1 day ago",
      urgency: "low",
      requiredSkills: ["Carpentry", "Outdoor"],
      estimatedDuration: "1 week"
    }
  ];

  const handleAcceptJob = (jobId) => {
    setLoading(true);
    // TODO: API call to accept job
    console.log(`Accepting job ${jobId}`);
    
    // Simulate API call
    setTimeout(() => {
      alert('Job accepted! You will be contacted with next steps.');
      setLoading(false);
      // Navigate to job details or confirmation
      navigate(`/contractor/job-accepted/${jobId}`);
    }, 1000);
  };

  const handleDeclineJob = (jobId) => {
    // TODO: API call to decline job
    console.log(`Declining job ${jobId}`);
    alert('Job declined. It will be offered to other contractors.');
  };

  const handleViewDetails = (jobId) => {
    navigate(`/contractor/job-details/${jobId}`);
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
            {/* Job count badge */}
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full">
              {availableJobs.length} available
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
          <button className="text-blue-600 hover:text-blue-700">
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Jobs List */}
      <div className="px-6 py-6">
        {availableJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-xl p-5 shadow-sm mb-4 border border-gray-100">
            {/* Job Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-800">{job.projectType}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getUrgencyColor(job.urgency)}`}>
                    {job.urgency.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500">{job.datePosted}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-green-600">{job.budget}</div>
                <div className="text-sm text-gray-500">{job.timeline}</div>
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
              <div className="flex items-center text-gray-600 text-sm">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}
              </div>
            </div>

            {/* Project Description */}
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {job.description}
            </p>

            {/* Required Skills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {job.requiredSkills.map((skill, index) => (
                <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
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
                {loading ? 'Accepting...' : 'Accept Job'}
              </button>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {availableJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs available</h3>
            <p className="text-gray-500">Check back later for new opportunities!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AvailableJobs;