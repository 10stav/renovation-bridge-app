import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomeownerRequests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Mock homeowner request data - will be replaced with API call
  const homeownerRequests = [
    {
      id: 1,
      customerName: "JOHN CUSTOMER",
      email: "johntestcustomer@test.com",
      phone: "+12345678910",
      location: "Baker Street, London",
      projectType: "Kitchen Renovation",
      budget: "$25,000",
      description: "Complete kitchen renovation including cabinets, countertops, and appliances. Looking for modern design with quality materials.",
      submittedDate: "2025-01-28",
      urgency: "high",
      status: "pending", // pending, assigned, in-progress, completed
      preferredTimeline: "2-4 weeks",
      source: "Website Form",
      ghlStatus: "Not Answered"
    },
    {
      id: 2,
      customerName: "SARAH JOHNSON",
      email: "sarah.johnson@email.com",
      phone: "+19876543210",
      location: "Main Street, Downtown",
      projectType: "Bathroom Remodel",
      budget: "$15,000",
      description: "Master bathroom renovation with walk-in shower, new vanity, and tile work. High-end finishes preferred.",
      submittedDate: "2025-01-27",
      urgency: "medium",
      status: "pending",
      preferredTimeline: "1-2 weeks",
      source: "Phone Call",
      ghlStatus: "Not Answered"
    },
    {
      id: 3,
      customerName: "MIKE WILLIAMS",
      email: "mike.w@email.com",
      phone: "+15551234567",
      location: "Oak Avenue, Suburbs",
      projectType: "Deck Construction",
      budget: "$8,500",
      description: "Build new composite deck in backyard. Includes railing and basic lighting installation.",
      submittedDate: "2025-01-26",
      urgency: "low",
      status: "assigned",
      preferredTimeline: "1 week",
      source: "Referral",
      ghlStatus: "Need to Book",
      assignedContractor: "Bob's Construction"
    }
  ];

  // Mock contractor data
  const availableContractors = [
    { id: 1, name: "Bob's Construction", specialties: ["Kitchen", "General"], rating: 4.8, available: true },
    { id: 2, name: "Elite Bathrooms", specialties: ["Bathroom", "Plumbing"], rating: 4.9, available: true },
    { id: 3, name: "Deck Masters", specialties: ["Outdoor", "Carpentry"], rating: 4.7, available: false },
    { id: 4, name: "All-Pro Renovations", specialties: ["Kitchen", "Bathroom", "General"], rating: 4.6, available: true }
  ];

  const handleAssignContractor = (requestId) => {
    setSelectedRequest(requestId);
    setShowAssignModal(true);
  };

  const handleViewDetails = (requestId) => {
    navigate(`/admin/request-details/${requestId}`);
  };

  const handleMoveToGHL = (requestId, stage) => {
    // TODO: API call to update GHL pipeline stage
    console.log(`Moving request ${requestId} to ${stage} in GoHighLevel`);
    alert(`Request moved to "${stage}" in GoHighLevel pipeline`);
  };

  const handleContactCustomer = (customerPhone, customerEmail) => {
    const action = window.confirm(`Contact customer?\n\nPhone: ${customerPhone}\nEmail: ${customerEmail}\n\nClick OK to call, Cancel to email`);
    if (action) {
      window.open(`tel:${customerPhone}`);
    } else {
      window.open(`mailto:${customerEmail}`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
          <button onClick={() => navigate('/admin/dashboard')} className="mr-4">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-800">Homeowner Requests</h1>
          <div className="flex items-center space-x-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
              + Add Request
            </button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white px-6 py-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-2">
              <option>All Status</option>
              <option>Pending</option>
              <option>Assigned</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-2">
              <option>All Projects</option>
              <option>Kitchen</option>
              <option>Bathroom</option>
              <option>Outdoor</option>
            </select>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-2">
              <option>All Urgency</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div className="text-sm text-gray-500">
            {homeownerRequests.length} total requests
          </div>
        </div>
      </div>

      {/* Requests List */}
      <div className="px-6 py-6">
        {homeownerRequests.map((request) => (
          <div key={request.id} className="bg-white rounded-xl p-5 shadow-sm mb-4 border border-gray-100">
            {/* Request Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{request.customerName}</h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(request.status)}`}>
                    {request.status.replace('-', ' ').toUpperCase()}
                  </span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getUrgencyColor(request.urgency)}`}>
                    {request.urgency.toUpperCase()}
                  </span>
                </div>
                <div className="text-md font-semibold text-blue-600 mb-1">{request.projectType}</div>
                <div className="text-sm text-gray-500">
                  Submitted: {request.submittedDate} • Source: {request.source}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-green-600">{request.budget}</div>
                <div className="text-sm text-gray-500">{request.preferredTimeline}</div>
                <div className="text-xs text-gray-400 mt-1">GHL: {request.ghlStatus}</div>
              </div>
            </div>

            {/* Customer Contact Info */}
            <div className="flex items-center space-x-4 mb-3 text-sm">
              <div className="flex items-center text-gray-600">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {request.email}
              </div>
              <div className="flex items-center text-gray-600">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {request.phone}
              </div>
              <div className="flex items-center text-gray-600">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {request.location}
              </div>
            </div>

            {/* Project Description */}
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {request.description}
            </p>

            {/* Assigned Contractor (if any) */}
            {request.assignedContractor && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <div className="flex items-center text-blue-800">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium">Assigned to: {request.assignedContractor}</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => handleViewDetails(request.id)}
                className="flex-1 min-w-[120px] bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
              >
                View Details
              </button>
              
              <button 
                onClick={() => handleContactCustomer(request.phone, request.email)}
                className="flex-1 min-w-[120px] bg-green-100 text-green-700 py-2 px-4 rounded-lg font-medium hover:bg-green-200 transition-colors duration-200"
              >
                Contact
              </button>

              {request.status === 'pending' && (
                <button 
                  onClick={() => handleAssignContractor(request.id)}
                  className="flex-1 min-w-[120px] bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  Assign Contractor
                </button>
              )}

              <button 
                onClick={() => handleMoveToGHL(request.id, 'Need to Book')}
                className="flex-1 min-w-[120px] bg-purple-100 text-purple-700 py-2 px-4 rounded-lg font-medium hover:bg-purple-200 transition-colors duration-200"
              >
                Move to GHL
              </button>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {homeownerRequests.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No requests found</h3>
            <p className="text-gray-500">New homeowner requests will appear here.</p>
          </div>
        )}
      </div>

      {/* Assign Contractor Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Assign Contractor</h3>
            <div className="space-y-3 mb-6">
              {availableContractors.filter(c => c.available).map((contractor) => (
                <div key={contractor.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{contractor.name}</div>
                      <div className="text-sm text-gray-500">{contractor.specialties.join(', ')}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">★ {contractor.rating}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowAssignModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert('Contractor assigned successfully!');
                  setShowAssignModal(false);
                }}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeownerRequests;