import React from 'react';
import { useNavigate } from 'react-router-dom';

function ContractorDashboard() {
  const navigate = useNavigate();
  
  const testNavigation = () => {
    console.log('🔥 Available Appointments Button clicked!');
    alert('Navigation test - would go to available jobs');
    navigate('/contractor/available-jobs');
  };

  const testOpenAppointments = () => {
    console.log('🔥 Open Appointments Button clicked!');
    alert('Open appointments clicked!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section with Blue Gradient */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-500 px-6 pt-12 pb-8 text-white">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button className="text-white text-2xl">☰</button>
          <div className="flex items-center space-x-4">
            <button onClick={() => console.log('Notifications clicked')} className="text-white text-xl">🔔</button>
            <button onClick={() => console.log('Settings clicked')} className="text-white text-xl">⚙️</button>
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
            onClick={testNavigation}
            className="flex-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-opacity-30 transition-all duration-200 cursor-pointer"
          >
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-xl">9</span>
            </div>
            <div className="text-xs font-medium">AVAILABLE</div>
            <div className="text-xs font-medium">APPOINTMENTS</div>
          </button>
          
          <button
            onClick={testOpenAppointments}
            className="flex-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 text-center hover:bg-opacity-30 transition-all duration-200 cursor-pointer"
          >
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-xl">2</span>
            </div>
            <div className="text-xs font-medium">OPEN</div>
            <div className="text-xs font-medium">APPOINTMENTS</div>
          </button>
        </div>
      </div>

      {/* Test Button for Debugging */}
      <div className="px-6 mb-4">
        <button 
          onClick={() => alert('Simple test button works!')}
          className="w-full bg-red-500 text-white py-4 rounded-lg font-bold text-lg"
        >
          🔥 TEST BUTTON - CLICK ME FIRST
        </button>
      </div>

      {/* Quick Stats Section */}
      <div className="px-6 py-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">QUICK STATS</h3>
        <div className="flex space-x-4 mb-8">
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
        
        {/* Appointment Item 1 */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-600 text-white rounded-lg px-3 py-2 text-center min-w-16">
              <div className="text-2xl font-bold">13</div>
              <div className="text-xs">MAR</div>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-1">JOHN WATTS</h4>
              <div className="flex items-center text-gray-500 text-sm mb-1">
                <span className="mr-1">📍</span>
                Baker St, England
              </div>
              <div className="flex items-center text-gray-500 text-sm mb-1">
                <span className="mr-1">⏰</span>
                16 March 2024 at 2:34 PM
              </div>
              <p className="text-gray-600 text-sm">
                We act as a process of repairing and improving something, especially a building. This includes updating especially a building. This includes updating...
              </p>
            </div>
          </div>
          <button
            onClick={() => alert('See Info clicked for Job 1')}
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            See Info
          </button>
        </div>

        {/* Appointment Item 2 */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <div className="flex items-start space-x-4">
            <div className="bg-blue-600 text-white rounded-lg px-3 py-2 text-center min-w-16">
              <div className="text-2xl font-bold">14</div>
              <div className="text-xs">MAR</div>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800 mb-1">JOHN WATTS</h4>
              <div className="flex items-center text-gray-500 text-sm mb-1">
                <span className="mr-1">📍</span>
                Baker St, England
              </div>
              <div className="flex items-center text-gray-500 text-sm mb-1">
                <span className="mr-1">⏰</span>
                16 March 2024 at 2:34 PM
              </div>
              <p className="text-gray-600 text-sm">
                We act as a process of repairing and improving something, especially a building. This includes updating especially a building. This includes updating...
              </p>
            </div>
          </div>
          <button
            onClick={() => alert('See Info clicked for Job 2')}
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            See Info
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center space-x-2 mt-6 mb-8">
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default ContractorDashboard;