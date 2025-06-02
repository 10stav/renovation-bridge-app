import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  const upcomingAppointments = [
    {
      id: 1,
      date: "13",
      month: "MAR",
      contractor: "JOHN WATTS",
      location: "Baker Street, London",
      description: "We act as a process of repairing and improving something, especially a building. This includes updating especially a building. This includes updating...",
    },
    {
      id: 2,
      date: "14",
      month: "MAR", 
      contractor: "JOHN WATTS",
      location: "Baker Street, London",
      description: "We act as a process of repairing and improving something, especially a building. This includes updating especially a building. This includes updating...",
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section with Blue Gradient */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-500 px-6 pt-12 pb-8 text-white">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => navigate('/dashboard')} className="text-white">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/notifications')} className="text-white">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
            <button onClick={() => navigate('/settings')} className="text-white">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
          <h2 className="text-3xl font-bold mb-4">Admin!</h2>
          <p className="text-blue-100 text-lg">What do you need to do today?</p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mb-8">
          <button className="flex-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center mb-3">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="text-xs font-medium">CONTRACTORS</div>
          </button>
          
          <button className="flex-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center mb-3">
              <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-white">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div className="text-xs font-medium">HOMEOWNERS</div>
          </button>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="px-6 py-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">QUICK STATS</h3>
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-600 font-bold">05</span>
            </div>
            <div className="text-xs text-gray-500">Open Projects</div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-green-600 font-bold">03</span>
            </div>
            <div className="text-xs text-gray-500">$2,845,500</div>
            <div className="text-xs text-gray-500">Closed Projects</div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-600 font-bold">02</span>
            </div>
            <div className="text-xs text-gray-500">Project Approved</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-red-600 font-bold">08</span>
          </div>
          <div className="text-xs text-gray-500 text-center">Total Appointments</div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="px-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">UPCOMING APPOINTMENTS</h3>
        
        {upcomingAppointments.map((appointment) => (
          <div key={appointment.id} className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white rounded-lg px-3 py-2 text-center min-w-16">
                <div className="text-2xl font-bold">{appointment.date}</div>
                <div className="text-xs">{appointment.month}</div>
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-1">{appointment.contractor}</h4>
                <div className="flex items-center text-gray-500 text-sm mb-1">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {appointment.location}
                </div>
                <p className="text-gray-600 text-sm">
                  {appointment.description}
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/appointments/1')}
              className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold"
            >
              View Details
            </button>
          </div>
        ))}

        {/* Create Event Button */}
        <button 
          onClick={() => navigate('/request-time')}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg mb-6"
        >
          Create an Event
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;