import React from 'react';
import { useNavigate } from 'react-router-dom';

function AppointmentConfirmed() {
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
          <button onClick={() => navigate('/appointments')}>
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Success Icon */}
      <div className="flex justify-center mt-12 mb-8">
        <div className="w-24 h-24 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <svg width="48" height="48" fill="none" stroke="white" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      {/* Confirmation Message */}
      <div className="text-center text-white px-6 mb-12">
        <h1 className="text-3xl font-bold mb-4">Appointment Confirmed</h1>
      </div>

      {/* Appointment Details Card */}
      <div className="mx-6 bg-white rounded-3xl p-6 shadow-xl">
        {/* Map Image Placeholder */}
        <div className="w-full h-32 bg-gray-200 rounded-xl mb-6 flex items-center justify-center">
          <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="text-gray-400">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

        {/* Contractor Info */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">JOHN WATTS</h2>
          <p className="text-gray-600">Booked on 16/02 at 08 pm</p>
        </div>

        {/* Appointment Details */}
        <div className="space-y-4 mb-8">
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">John Watts Details</h3>
            <p className="text-gray-600 text-sm">John Watts</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Date</h3>
            <p className="text-gray-600 text-sm">16 / 02 at 08 pm</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
            <p className="text-gray-600 text-sm">123-456-789-10</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
            <p className="text-gray-600 text-sm">J.Watts@email.com</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Address</h3>
            <p className="text-gray-600 text-sm">2336, Baker's street, London.</p>
          </div>

          <div>
            <button 
              onClick={() => navigate('/appointments/1')}
              className="text-blue-600 font-semibold text-sm"
            >
              View Project Details
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button 
            onClick={() => navigate('/appointments')}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg"
          >
            View available appointments
          </button>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-8"></div>
    </div>
  );
}

export default AppointmentConfirmed;