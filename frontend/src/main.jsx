import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx'; // ADD THIS LINE
import App from './App.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AvailableAppointments from './pages/AvailableAppointments.jsx';
import AppointmentDetails from './pages/AppointmentDetails.jsx';
import AppointmentConfirmed from './pages/AppointmentConfirmed.jsx';
import Settings from './pages/Settings.jsx';
import RequestTime from './pages/RequestTime.jsx';
import Notifications from './pages/Notifications.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider> {/* WRAP EVERYTHING IN AppProvider */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<AvailableAppointments />} />
          <Route path="/appointments/:id" element={<AppointmentDetails />} />
          <Route path="/confirmed" element={<AppointmentConfirmed />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/request-time" element={<RequestTime />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </AppProvider> {/* CLOSE AppProvider */}
  </React.StrictMode>
);