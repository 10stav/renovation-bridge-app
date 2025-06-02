import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RequestTime() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(15);
  const [selectedTime, setSelectedTime] = useState('08 PM');
  
  const timeSlots = ['08 PM', '09 PM', '10 PM', '11 PM', '12 PM'];
  
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

      {/* Calendar Header */}
      <div className="px-6 py-4 text-white">
        <h1 className="text-2xl font-bold mb-2">March 2024</h1>
      </div>

      {/* Calendar */}
      <div className="mx-6 mb-6">
        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
              <div key={day} className="text-center text-white text-xs font-medium py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* First Week */}
            {[null, null, null, null, null, 1, 2].map((date, index) => (
              <button
                key={index}
                className={`h-10 rounded-lg ${
                  date ? 'text-white hover:bg-white hover:bg-opacity-20' : ''
                }`}
              >
                {date}
              </button>
            ))}
            
            {/* Other weeks */}
            {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`h-10 rounded-lg text-white ${
                  selectedDate === date
                    ? 'bg-white bg-opacity-30'
                    : 'hover:bg-white hover:bg-opacity-20'
                }`}
              >
                {date}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Date Display */}
      <div className="mx-6 mb-6">
        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 text-center">
          <h2 className="text-white text-xl font-bold">15 March, 2024</h2>
        </div>
      </div>

      {/* Time Selection */}
      <div className="mx-6 mb-6">
        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6">
          <div className="grid grid-cols-3 gap-3">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-3 rounded-lg font-semibold ${
                  selectedTime === time
                    ? 'bg-white text-blue-600'
                    : 'bg-white bg-opacity-30 text-white'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Time Display */}
      <div className="mx-6 mb-8">
        <div className="text-center text-white">
          <p className="text-sm opacity-75 mb-1">You selected</p>
          <p className="text-lg font-bold">15 / 02 at 08 pm</p>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-6 pb-8">
        <button 
          onClick={() => navigate('/confirmed')}
          className="w-full bg-white text-blue-600 py-4 rounded-2xl font-bold text-lg shadow-lg"
        >
          Send Request
        </button>
      </div>
    </div>
  );
}

export default RequestTime;