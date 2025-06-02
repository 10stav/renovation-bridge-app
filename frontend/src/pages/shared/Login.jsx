import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import ApiService from '../../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useApp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await ApiService.login(email, password);
      
      // Update app context
      login(response.user);
      
      console.log('✅ Login successful:', response.user);
      navigate('/dashboard');
    } catch (error) {
      console.error('❌ Login failed:', error);
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Background Image Section */}
      <div className="relative h-80">
        <img
          src="/login-bg.jpg"
          alt="Modern house exterior with outdoor living space"
          className="w-full h-full object-cover"
        />
      </div>

      {/* White Form Container */}
      <div className="flex-1 bg-white rounded-t-3xl -mt-16 px-8 pt-8 pb-8 relative z-10">
        {/* Company Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
            <img 
              src="/renovation-bridge-logo.png" 
              alt="Renovation Bridge Logo" 
              className="w-10 h-10 object-contain"
            />
          </div>
        </div>

        {/* Welcome Text */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">
          Welcome Back!
        </h1>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
              required
              disabled={loading}
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#313bc0' }}
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        {/* Test Account Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">Test Account:</h3>
          <p className="text-blue-700 text-sm">
            Email: test@renovation.com<br/>
            Password: test123
          </p>
        </div>

        {/* Forgot Password Link */}
        <div className="text-center mb-6">
          <button className="text-gray-500 hover:text-blue-600 transition-colors duration-200 text-sm">
            Forgot Password?
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <span className="text-gray-400 text-sm">DON'T HAVE AN ACCOUNT? </span>
          <button className="font-bold hover:underline transition-colors duration-200 text-sm" style={{ color: '#313bc0' }}>
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;