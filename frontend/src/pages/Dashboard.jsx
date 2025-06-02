import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section with Blue Gradient */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-500 px-6 pt-12 pb-8 text-white">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button className="text-white">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/notifications')} className="text-white">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 0 0-15 0v5h5l-5 5-5-5h5V7a9.5 9.5 0 0 1 19 0v10z" />
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
          <h2 className="text-3xl font-bold mb-4">Dovahklin!</h2>
          <p className="text-blue-100 text-lg">What do you need to do today?</p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mb-8">
          <button 
            onClick={() => navigate('/appointments')}
            className="flex-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-opacity-30 transition-all duration-200"
          >
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-xl">9</span>
            </div>
            <div className="text-xs font-medium">AVAILABLE</div>
            <div className="text-xs font-medium">APPOINTMENTS</div>
          </button>
          
          <button 
            onClick={() => navigate('/appointments')}
            className="flex-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-opacity-30 transition-all duration-200"
          >
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <div className="text-xs font-medium">OPEN</div>
            <div className="text-xs font-medium">APPOINTMENTS</div>
          </button>
        </div>
      </div>

      {/* Bottom Navigation Icons */}
      <div className="flex justify-center space-x-8 -mt-4 mb-8">
        <button 
          onClick={() => navigate('/appointments')}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 transition-colors duration-200"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </button>
        <button 
          onClick={() => navigate('/admin')}
          className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-50 transition-colors duration-200"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
      </div>

      {/* Quick Stats Section */}
      <div className="px-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">QUICK STATS</h3>
        <div className="flex space-x-4">
          <div className="flex-1 bg-white rounded-xl p-4 shadow-sm">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <span className="text-blue-600 font-bold">08</span>
            </div>
            <div className="text-xs text-gray-500">Total Appointments</div>
          </div>
          
          <div className="flex-1 bg-white rounded-xl p-4 shadow-sm">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <span className="text-blue-600 font-bold">03</span>
            </div>
            <div className="text-xs text-gray-500">Closed Appointments</div>
          </div>
          
          <div className="flex-1 bg-white rounded-xl p-4 shadow-sm">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <span className="text-blue-600 font-bold">04</span>
            </div>
            <div className="text-xs text-gray-500">Open Appointments</div>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="px-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">UPCOMING APPOINTMENTS</h3>
        
        {/* Appointment Item */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-600 text-white rounded-lg px-3 py-2 text-center min-w-16">
              <div className="text-2xl font-bold">13</div>
              <div className="text-xs">MAR</div>
            </div>
            
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-1">JOHN WATTS</h4>
              <div className="flex items-center text-gray-500 text-sm mb-1">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Baker Street, London
              </div>
              <div className="flex items-center text-gray-500 text-sm mb-1">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                16 March 2024 at 2:34 PM
              </div>
              <p className="text-gray-600 text-sm">
                We act as a process of repairing and improving something, especially a building. This includes updating especially a building. This includes updating...
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/appointments/1')}
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            See Info
          </button>
        </div>

        {/* Second Appointment Item */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-600 text-white rounded-lg px-3 py-2 text-center min-w-16">
              <div className="text-2xl font-bold">14</div>
              <div className="text-xs">MAR</div>
            </div>
            
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-1">JOHN WATTS</h4>
              <div className="flex items-center text-gray-500 text-sm mb-1">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Baker Street, London
              </div>
              <div className="flex items-center text-gray-500 text-sm mb-1">
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                16 March 2024 at 2:34 PM
              </div>
              <p className="text-gray-600 text-sm">
                We act as a process of repairing and improving something, especially a building. This includes updating especially a building. This includes updating...
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/appointments/2')}
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            See Info
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;