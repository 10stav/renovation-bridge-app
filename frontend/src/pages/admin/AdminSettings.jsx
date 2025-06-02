//admin settings page/screen for app (admin specific notifications)

import React from 'react';
import { useNavigate } from 'react-router-dom';

function Settings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-500">
      {/* Header */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between text-white">
          <button onClick={() => navigate('/dashboard')}>
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center space-x-4">
            <button>
              <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                <path d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 0 0-15 0v5h5l-5 5-5-5h5V7a9.5 9.5 0 0 1 19 0v10z"/>
              </svg>
            </button>
            <button onClick={() => navigate('/dashboard')}>
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="px-6 py-4">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
      </div>

      {/* Settings Content */}
      <div className="flex-1 bg-white rounded-t-3xl mt-6 px-6 py-8">
        
        {/* Payment Information Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Information</h2>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between py-4 border-b border-gray-100">
              <div className="flex items-center">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-3 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.79 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.79 4 8 4s8-1.79 8-4M4 7c0-2.21 3.79-4 8-4s8 1.79 8 4" />
                </svg>
                <span className="text-gray-700">Update payment information</span>
              </div>
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button className="w-full flex items-center justify-between py-4 border-b border-gray-100">
              <div className="flex items-center">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-3 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-gray-700">View invoices</span>
              </div>
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button className="w-full flex items-center justify-between py-4 border-b border-gray-100">
              <div className="flex items-center">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-3 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <span className="text-gray-700">Review</span>
              </div>
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* General Settings Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">General Settings</h2>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between py-4 border-b border-gray-100">
              <div className="flex items-center">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-3 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-gray-700">Privacy Policy</span>
              </div>
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button className="w-full flex items-center justify-between py-4 border-b border-gray-100">
              <div className="flex items-center">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-3 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-gray-700">Our Agreement</span>
              </div>
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Sign Out Button */}
        <div className="mt-12">
          <button 
            onClick={() => navigate('/login')}
            className="w-full bg-red-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-red-600 transition-colors duration-200"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;