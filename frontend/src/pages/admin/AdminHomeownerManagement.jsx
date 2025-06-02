import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HomeownerManagement() {
  const navigate = useNavigate();
  const [homeowners, setHomeowners] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock homeowner database - will be replaced with API call
  const allHomeowners = [
    {
      id: 1,
      name: "John Customer",
      email: "johntestcustomer@test.com",
      phone: "+12345678910",
      address: "123 Baker Street, London",
      dateAdded: "2025-01-15",
      totalProjects: 2,
      totalSpent: "$40,000",
      status: "active", // active, inactive, potential
      lastContact: "2025-01-28",
      preferredContactMethod: "email",
      projects: [
        { id: 1, type: "Kitchen Renovation", status: "completed", amount: "$25,000", date: "2024-12-15" },
        { id: 2, type: "Bathroom Remodel", status: "in-progress", amount: "$15,000", date: "2025-01-20" }
      ],
      notes: "Previous customer, very satisfied with kitchen work. Prefers email communication.",
      rating: 5,
      referralSource: "Google Search"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+19876543210",
      address: "456 Main Street, Downtown",
      dateAdded: "2025-01-10",
      totalProjects: 1,
      totalSpent: "$15,000",
      status: "active",
      lastContact: "2025-01-25",
      preferredContactMethod: "phone",
      projects: [
        { id: 3, type: "Bathroom Remodel", status: "scheduled", amount: "$15,000", date: "2025-02-01" }
      ],
      notes: "New customer, very detail-oriented. Prefers phone calls.",
      rating: null,
      referralSource: "Referral from John Customer"
    },
    {
      id: 3,
      name: "Mike Williams",
      email: "mike.w@email.com",
      phone: "+15551234567",
      address: "789 Oak Avenue, Suburbs",
      dateAdded: "2024-11-20",
      totalProjects: 3,
      totalSpent: "$55,000",
      status: "inactive",
      lastContact: "2024-12-15",
      preferredContactMethod: "email",
      projects: [
        { id: 4, type: "Deck Construction", status: "completed", amount: "$8,500", date: "2024-12-01" },
        { id: 5, type: "Kitchen Renovation", status: "completed", amount: "$30,000", date: "2024-10-15" },
        { id: 6, type: "Bathroom Upgrade", status: "completed", amount: "$16,500", date: "2024-09-01" }
      ],
      notes: "Long-term customer, multiple successful projects. May be interested in outdoor improvements.",
      rating: 5,
      referralSource: "Website"
    },
    {
      id: 4,
      name: "Lisa Chen",
      email: "lisa.chen@email.com",
      phone: "+14567891234",
      address: "321 Elm Street, City Center",
      dateAdded: "2025-01-22",
      totalProjects: 0,
      totalSpent: "$0",
      status: "potential",
      lastContact: "2025-01-22",
      preferredContactMethod: "email",
      projects: [],
      notes: "Interested in kitchen renovation, requested quote. Budget around $20k.",
      rating: null,
      referralSource: "Facebook Ad"
    }
  ];

  const handleViewProfile = (homeownerId) => {
    navigate(`/admin/homeowner-profile/${homeownerId}`);
  };

  const handleContact = (homeowner) => {
    if (homeowner.preferredContactMethod === 'phone') {
      window.open(`tel:${homeowner.phone}`);
    } else {
      window.open(`mailto:${homeowner.email}`);
    }
  };

  const handleAddProject = (homeownerId) => {
    navigate(`/admin/add-project/${homeownerId}`);
  };

  const handleViewProjects = (homeownerId) => {
    navigate(`/admin/homeowner-projects/${homeownerId}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'potential': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingStars = (rating) => {
    if (!rating) return <span className="text-gray-400 text-sm">No rating</span>;
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    );
  };

  const filteredHomeowners = allHomeowners.filter(homeowner => {
    const matchesSearch = homeowner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         homeowner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         homeowner.phone.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || homeowner.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

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
          <h1 className="text-xl font-bold text-gray-800">Homeowner Management</h1>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            + Add Homeowner
          </button>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white px-6 py-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search homeowners..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="potential">Potential</option>
            </select>
          </div>
          <div className="text-sm text-gray-500">
            {filteredHomeowners.length} of {allHomeowners.length} homeowners
          </div>
        </div>
      </div>

      {/* Statistics Bar */}
      <div className="bg-white px-6 py-4 border-b">
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{allHomeowners.filter(h => h.status === 'active').length}</div>
            <div className="text-sm text-gray-500">Active Customers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              ${allHomeowners.reduce((total, h) => total + parseInt(h.totalSpent.replace(/[$,]/g, '')), 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-500">Total Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {allHomeowners.reduce((total, h) => total + h.totalProjects, 0)}
            </div>
            <div className="text-sm text-gray-500">Total Projects</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{allHomeowners.filter(h => h.status === 'potential').length}</div>
            <div className="text-sm text-gray-500">Potential Leads</div>
          </div>
        </div>
      </div>

      {/* Homeowners List */}
      <div className="px-6 py-6">
        {filteredHomeowners.map((homeowner) => (
          <div key={homeowner.id} className="bg-white rounded-xl p-6 shadow-sm mb-4 border border-gray-100">
            {/* Homeowner Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-800">{homeowner.name}</h3>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(homeowner.status)}`}>
                    {homeowner.status.toUpperCase()}
                  </span>
                </div>
                {getRatingStars(homeowner.rating)}
                <div className="text-sm text-gray-500 mt-1">
                  Customer since {homeowner.dateAdded} • {homeowner.referralSource}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-green-600">{homeowner.totalSpent}</div>
                <div className="text-sm text-gray-500">{homeowner.totalProjects} projects</div>
                <div className="text-xs text-gray-400">Last contact: {homeowner.lastContact}</div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
              <div className="flex items-center text-gray-600">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {homeowner.email}
              </div>
              <div className="flex items-center text-gray-600">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {homeowner.phone}
              </div>
              <div className="flex items-center text-gray-600">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {homeowner.address}
              </div>
            </div>

            {/* Recent Projects Preview */}
            {homeowner.projects.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-800 mb-2">Recent Projects:</h4>
                <div className="flex flex-wrap gap-2">
                  {homeowner.projects.slice(0, 3).map((project) => (
                    <span key={project.id} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded">
                      {project.type} ({project.status})
                    </span>
                  ))}
                  {homeowner.projects.length > 3 && (
                    <span className="text-gray-500 text-xs">+{homeowner.projects.length - 3} more</span>
                  )}
                </div>
              </div>
            )}

            {/* Notes */}
            {homeowner.notes && (
              <div className="mb-4">
                <p className="text-gray-600 text-sm italic">"{homeowner.notes}"</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => handleViewProfile(homeowner.id)}
                className="flex-1 min-w-[120px] bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                View Profile
              </button>
              <button 
                onClick={() => handleContact(homeowner)}
                className="flex-1 min-w-[120px] bg-green-100 text-green-700 py-2 px-4 rounded-lg font-medium hover:bg-green-200 transition-colors"
              >
                Contact
              </button>
              <button 
                onClick={() => handleViewProjects(homeowner.id)}
                className="flex-1 min-w-[120px] bg-purple-100 text-purple-700 py-2 px-4 rounded-lg font-medium hover:bg-purple-200 transition-colors"
              >
                View Projects
              </button>
              <button 
                onClick={() => handleAddProject(homeowner.id)}
                className="flex-1 min-w-[120px] bg-orange-100 text-orange-700 py-2 px-4 rounded-lg font-medium hover:bg-orange-200 transition-colors"
              >
                Add Project
              </button>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {filteredHomeowners.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No homeowners found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Add Homeowner Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Add New Homeowner</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              <input type="email" placeholder="Email Address" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              <input type="tel" placeholder="Phone Number" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              <input type="text" placeholder="Address" className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                <option>Referral Source</option>
                <option>Google Search</option>
                <option>Facebook Ad</option>
                <option>Referral</option>
                <option>Website</option>
                <option>Other</option>
              </select>
              <textarea placeholder="Notes" className="w-full border border-gray-300 rounded-lg px-3 py-2 h-20"></textarea>
            </div>
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert('Homeowner added successfully!');
                  setShowAddModal(false);
                }}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium"
              >
                Add Homeowner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeownerManagement;