import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';

// Shared Components
import Login from './pages/shared/Login.jsx';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminHomeownerManagement from './pages/admin/AdminHomeownerManagement.jsx';
import AdminHomeownerRequests from './pages/admin/AdminHomeownerRequests.jsx';
import AdminNotifications from './pages/admin/AdminNotifications.jsx';
import AdminSettings from './pages/admin/AdminSettings.jsx';

// Contractor Pages
import ContractorDashboard from './pages/contractor/ContractorDashboard.jsx';
import ContractorAvailableJobs from './pages/contractor/ContractorAvailableJobs.jsx';
import ContractorAppointmentDetails from './pages/contractor/ContractorAppointmentDetails.jsx';
import ContractorAppointmentConfirmed from './pages/contractor/ContractorAppointmentConfirmed.jsx';
import ContractorRequestTime from './pages/contractor/ContractorRequestTime.jsx';

// Import your main App component if you still need it
import App from './App.jsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Root and Authentication Routes */}
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Routes - FLAT STRUCTURE */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/homeowner-management" element={<AdminHomeownerManagement />} />
          <Route path="/admin/homeowner-requests" element={<AdminHomeownerRequests />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/homeowner-profile/:id" element={<AdminHomeownerManagement />} />
          <Route path="/admin/homeowner-projects/:id" element={<AdminHomeownerManagement />} />
          <Route path="/admin/request-details/:id" element={<AdminHomeownerRequests />} />
          <Route path="/admin/add-project/:id" element={<AdminHomeownerManagement />} />

          {/* Contractor Routes - FLAT STRUCTURE */}
          <Route path="/contractor/dashboard" element={<ContractorDashboard />} />
          <Route path="/contractor/available-jobs" element={<ContractorAvailableJobs />} />
          <Route path="/contractor/job-details/:id" element={<ContractorAppointmentDetails />} />
          <Route path="/contractor/job-accepted/:id" element={<ContractorAppointmentConfirmed />} />
          <Route path="/contractor/request-time" element={<ContractorRequestTime />} />
          <Route path="/contractor/appointments" element={<ContractorAvailableJobs />} />
          <Route path="/contractor/appointments/:id" element={<ContractorAppointmentDetails />} />
          <Route path="/contractor/confirmed" element={<ContractorAppointmentConfirmed />} />

          {/* Legacy Routes for Backward Compatibility */}
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/appointments" element={<ContractorAvailableJobs />} />
          <Route path="/appointments/:id" element={<ContractorAppointmentDetails />} />
          <Route path="/confirmed" element={<ContractorAppointmentConfirmed />} />
          <Route path="/settings" element={<AdminSettings />} />
          <Route path="/request-time" element={<ContractorRequestTime />} />
          <Route path="/notifications" element={<AdminNotifications />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Catch-all route - redirect to login */}
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);