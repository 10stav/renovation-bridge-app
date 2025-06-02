//admin notifications page/screen for app

import React from 'react';
import { useNavigate } from 'react-router-dom';

function Notifications() {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      message: "Your request for another time has been updated on this appointment",
      time: "14h - Today",
      isNew: true
    },
    {
      id: 2,
      message: "Your request for another time has been updated on this appointment",
      time: "14h - Today",
      isNew: true
    },
    {
      id: 3,
      message: "Your request for another time has been updated on this appointment",
      time: "14h - Today",
      isNew: true
    },
    {
      id: 4,
      message: "Your request for another time has been updated on this appointment",
      time: "14h - Today",
      isNew: true
    },
    {
      id: 5,
      message: "Your request for another time has been updated on this appointment",
      time: "14h - Today",
      isNew: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('/dashboard')}>
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-800">Notifications</h1>
          <button onClick={() => navigate('/settings')}>
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-6 py-6">
        {notifications.map((notification) => (
          <div key={notification.id} className="bg-white rounded-xl p-4 mb-4 shadow-sm">
            <div className="flex items-start space-x-4">
              {/* Notification Icon */}
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 0 0-15 0v5h5l-5 5-5-5h5V7a9.5 9.5 0 0 1 19 0v10z" />
                </svg>
              </div>

              {/* Notification Content */}
              <div className="flex-1">
                <p className="text-gray-800 text-sm leading-relaxed mb-2">
                  {notification.message}
                </p>
                <p className="text-gray-500 text-xs">
                  {notification.time}
                </p>
              </div>

              {/* New Indicator */}
              {notification.isNew && (
                <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;