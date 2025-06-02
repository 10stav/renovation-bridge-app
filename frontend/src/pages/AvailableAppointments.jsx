import React from 'react';
import { useNavigate } from 'react-router-dom';

function AvailableAppointments() {
  const navigate = useNavigate();

  const appointments = [
    {
      id: 1,
      contractor: "JOHN WATTS",
      location: "Baker Street, London",
      time: "16 March 2024 at 2:34 PM",
      description: "We act as a process of repairing and improving something, especially a building. This includes updating especially a building. This includes updating...",
    },
    {
      id: 2,
      contractor: "JOHN WATTS",
      location: "Baker Street, London", 
      time: "16 March 2024 at 2:34 PM",
      description: "We act as a process of repairing and improving something, especially a building. This includes updating especially a building. This includes updating...",
    },
    {
      id: 3,
      contractor: "JOHN WATTS",
      location: "Baker Street, London",
      time: "16 March 2024 at 2:34 PM", 
      description: "We act as a process of repairing and improving something, especially a building. This includes updating especially a building. This includes updating...",
    },
    {
      id: 4,
      contractor: "JOHN WATTS",
      location: "Baker Street, London",
      time: "16 March 2024 at 2:34 PM",
      description: "We act as a process of repairing and improving something, especially a building. This includes updating especially a building. This includes updating...",
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center">
          <button onClick={() => navigate('/dashboard')} className="mr-4">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold text-gray-800">Available Appointments</h1>
        </div>
      </div>

      {/* Search Icon (Top Right) */}
      <div className="absolute top-4 right-6">
        <button className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      {/* Appointments List */}
      <div className="px-6 py-6">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="bg-white rounded-xl p-5 shadow-sm mb-4">
            {/* Contractor Name */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-800">{appointment.contractor}</h3>
              <button className="text-gray-400">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
            </div>

            {/* Location */}
            <div className="flex items-center text-gray-500 text-sm mb-2">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {appointment.location}
            </div>

            {/* Time */}
            <div className="flex items-center text-gray-500 text-sm mb-3">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {appointment.time}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              {appointment.description}
            </p>

            {/* See Info Button */}
            <button 
              onClick={() => navigate(`/appointments/${appointment.id}`)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              See Info
            </button>
          </div>
        ))}

        {/* Load More Link */}
        <div className="text-center mt-6">
          <button className="text-blue-600 text-sm font-medium">
            Swipe to see Hidden Appointments →
          </button>
        </div>
      </div>
    </div>
  );
}

export default AvailableAppointments;