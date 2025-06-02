import React, { useState } from 'react';

function AppointmentBookingForm() {
  const [selectedDate, setSelectedDate] = useState(16);
  const [selectedTime, setSelectedTime] = useState('09 PM');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Booking form state
  const [bookingData, setBookingData] = useState({
    projectName: 'Kitchen Renovation Project',
    projectDescription: 'Complete kitchen renovation including cabinets, countertops, and appliances',
    timeline: 'Beginning',
    budget: 15000,
    address: {
      street: '123 Baker Street',
      city: 'London',
      state: 'UK',
      zipCode: 'SW1A 1AA'
    },
    notes: ''
  });

  const timeSlots = ['09 PM', '10 PM', '11 PM', '12 PM'];
  const dates = [16, 17, 18, 19, 20];

  const handleBookingSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      // Prepare appointment data
      const appointmentData = {
        projectName: bookingData.projectName,
        projectDescription: bookingData.projectDescription,
        appointmentDate: `2024-03-${selectedDate.toString().padStart(2, '0')}`,
        appointmentTime: selectedTime,
        timeline: bookingData.timeline,
        budget: bookingData.budget,
        address: bookingData.address,
        notes: bookingData.notes
      };

      console.log('🚀 Submitting appointment:', appointmentData);

      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      // Call API to create appointment (this triggers automation!)
      const response = await fetch('http://localhost:3001/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(appointmentData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to book appointment');
      }

      console.log('✅ Appointment response:', result);
      alert('🎉 Appointment booked successfully! Check backend terminal for automation logs.');

    } catch (error) {
      console.error('❌ Booking error:', error);
      setError(error.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">🔥 Test Appointment Booking Automation</h1>
        <p className="text-gray-600 text-center mt-2">This will trigger GoHighLevel + QuickBooks automation</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
          {error}
        </div>
      )}

      {/* Contractor Info */}
      <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">JOHN WATTS</h2>
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Baker Street, London
        </div>
      </div>

      {/* Project Details Form */}
      <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">📋 Project Details</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
            <input
              type="text"
              value={bookingData.projectName}
              onChange={(e) => setBookingData({...bookingData, projectName: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Description</label>
            <textarea
              value={bookingData.projectDescription}
              onChange={(e) => setBookingData({...bookingData, projectDescription: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Budget ($)</label>
            <input
              type="number"
              value={bookingData.budget}
              onChange={(e) => setBookingData({...bookingData, budget: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
            <select
              value={bookingData.timeline}
              onChange={(e) => setBookingData({...bookingData, timeline: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Beginning">Beginning</option>
              <option value="1-2 weeks">1-2 weeks</option>
              <option value="2-4 weeks">2-4 weeks</option>
              <option value="1+ months">1+ months</option>
            </select>
          </div>
        </div>
      </div>

      {/* Appointment Scheduling */}
      <div className="bg-white rounded-xl p-5 shadow-sm mb-6">
        <h3 className="font-semibold text-gray-800 mb-4">📅 Select Date & Time</h3>

        {/* Date Selection */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Select Date</h4>
          <div className="flex space-x-2">
            {['S', 'M', 'T', 'W', 'T'].map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-500 mb-1">{day}</div>
                <button
                  onClick={() => setSelectedDate(dates[index])}
                  className={`w-10 h-10 rounded-full ${
                    selectedDate === dates[index]
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } transition-colors`}
                >
                  {dates[index]}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Time Selection */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Select Time</h4>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  selectedTime === time
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Summary */}
      <div className="bg-blue-50 rounded-xl p-4 mb-6">
        <h4 className="font-semibold text-blue-800 mb-2">📋 Booking Summary</h4>
        <div className="text-blue-700 text-sm space-y-1">
          <p><strong>Project:</strong> {bookingData.projectName}</p>
          <p><strong>Date:</strong> March {selectedDate}, 2024</p>
          <p><strong>Time:</strong> {selectedTime}</p>
          <p><strong>Budget:</strong> ${bookingData.budget.toLocaleString()}</p>
          <p><strong>Timeline:</strong> {bookingData.timeline}</p>
        </div>
      </div>

      {/* Action Button */}
      <div className="space-y-3">
        <button 
          onClick={handleBookingSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {loading ? '🔄 Booking & Triggering Automation...' : '🚀 Book Appointment & Trigger Automation'}
        </button>
      </div>

      {/* Automation Info */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4 mt-6">
        <h4 className="font-bold text-yellow-800 mb-2">🔥 What Happens When You Click?</h4>
        <div className="text-yellow-700 text-sm space-y-1">
          <p>✅ Appointment saved to database</p>
          <p>📅 GoHighLevel calendar creation attempt</p>
          <p>💰 QuickBooks invoice generation attempt</p>
          <p>📱 Automation logs in backend terminal</p>
          <p><strong>Watch your backend terminal for real-time automation!</strong></p>
        </div>
      </div>
    </div>
  );
}

export default AppointmentBookingForm;