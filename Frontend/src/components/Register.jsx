import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    userType: 'farmer',
    agreeTerms: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Updated handler for registration with auto-login
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    if (!formData.agreeTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      // Combine first and last name for the backend
      const userData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.userType === 'admin' ? 'admin' : 'user' // Default to user role
      };
      
      console.log('Sending registration request with:', userData);
      
      // Register the user
      const registerResponse = await axios.post(
        'http://localhost:5000/api/auth/register',
        userData
      );
      
      console.log('Registration response:', registerResponse.data);
      
      // If registration successful, proceed to auto-login
      if (registerResponse.data.success) {
        try {
          console.log('Attempting auto-login after registration');
          
          // Auto-login with the same credentials
          const loginResponse = await axios.post(
            'http://localhost:5000/api/auth/login',
            { 
              email: formData.email, 
              password: formData.password 
            },
            { withCredentials: true }
          );
          
          console.log('Auto-login response:', loginResponse.data);
          
          // Store token and user data in localStorage
          localStorage.setItem('token', loginResponse.data.token);
          
          // Store user info with proper formatting to ensure consistent retrieval
          const userData = {
            id: loginResponse.data.user.id,
            name: loginResponse.data.user.name,
            email: loginResponse.data.user.email,
            phone: loginResponse.data.user.phone,
            role: loginResponse.data.user.role
          };
          
          localStorage.setItem('user', JSON.stringify(userData));
          
          // Redirect to home page
          navigate('/');
          
        } catch (loginErr) {
          console.error('Auto-login after registration failed:', loginErr);
          // If auto-login fails, still consider registration successful
          // but redirect to login page instead with a message
          navigate('/login', { 
            state: { 
              message: 'Registration successful! Please log in with your new account.' 
            } 
          });
        }
      } else {
        // Handle non-error but unsuccessful registration
        setError(registerResponse.data.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error details:', err.response ? err.response.data : err.message);
      setError(
        err.response?.data?.message || 
        'Registration failed. Please try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      {/* Header/Logo Bar */}
      <div className="bg-green-600 p-4 fixed top-0 w-full z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-2xl font-bold">AgriStore</Link>
          <Link to="/" className="text-white hover:text-green-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
        </div>
      </div>
      
      <div className="max-w-2xl w-full mx-auto mt-20 mb-10">
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-green-100 rounded-full opacity-40"></div>
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-green-100 rounded-full opacity-40"></div>
          
          <div className="relative">
            <div className="text-center mb-8">
              <div className="inline-block p-4 rounded-full bg-green-100 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Create Your Account</h2>
              <p className="text-gray-600 mt-2">Join the AgriStore community today</p>
            </div>
            
            {/* Error message display */}
            {error && (
              <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your first name"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 w-full pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10 w-full pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="userType">
                  I am a:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <div 
                    onClick={() => setFormData({...formData, userType: 'farmer'})}
                    className={`cursor-pointer border rounded-lg p-3 text-center ${formData.userType === 'farmer' ? 'bg-green-100 border-green-500' : 'border-gray-300 hover:bg-gray-50'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="font-medium">Farmer</div>
                  </div>
                  <div 
                    onClick={() => setFormData({...formData, userType: 'supplier'})}
                    className={`cursor-pointer border rounded-lg p-3 text-center ${formData.userType === 'supplier' ? 'bg-green-100 border-green-500' : 'border-gray-300 hover:bg-gray-50'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <div className="font-medium">Supplier</div>
                  </div>
                  <div 
                    onClick={() => setFormData({...formData, userType: 'buyer'})}
                    className={`cursor-pointer border rounded-lg p-3 text-center ${formData.userType === 'buyer' ? 'bg-green-100 border-green-500' : 'border-gray-300 hover:bg-gray-50'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div className="font-medium">Buyer</div>
                  </div>
                </div>
                <input 
                  type="hidden" 
                  name="userType" 
                  value={formData.userType}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="pl-10 w-full pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Create a password"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Must be at least 6 characters long</p>
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pl-10 w-full pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Confirm your password"
                    />
                  </div>
                  {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  required
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-700">
                  I agree to the <a href="#" className="text-green-600 hover:text-green-500">Terms of Service</a> and <a href="#" className="text-green-600 hover:text-green-500">Privacy Policy</a>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={isLoading || formData.password !== formData.confirmPassword || !formData.agreeTerms}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : "Create Account"}
              </button>
            </form>
            
            <div className="relative flex py-5 items-center mt-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-600">or sign up with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 mt-6">
              <button className="flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.617 0 3.077.573 4.223 1.5l3.143-3.143C17.51 1.59 14.909.5 12 .5c-3.99 0-7.477 2.116-9.417 5.276l3.518 2.717C7.05 6.095 9.393 5 12 5z"/>
                  <path fill="#4285F4" d="M23.5 12c0-.82-.069-1.634-.2-2.443H12v4.7h6.458c-.274 1.465-1.123 2.696-2.387 3.528l3.675 2.852c2.15-1.986 3.39-4.92 3.39-8.637z"/>
                  <path fill="#FBBC05" d="M5.279 14.294c-.23-.69-.36-1.427-.36-2.294 0-.867.13-1.604.36-2.294L1.76 6.988C.95 8.525.5 10.218.5 12s.45 3.475 1.26 5.012l3.519-2.718z"/>
                  <path fill="#34A853" d="M12 23.5c3.322 0 6.093-1.1 8.134-2.863l-3.675-2.852c-1.025.68-2.333 1.083-4.458 1.083-2.606 0-4.949-1.095-5.9-2.574L2.58 19.012C4.53 21.874 8.007 23.5 12 23.5z"/>
                  <path fill="none" d="M.5.5h23v23H.5z"/>
                </svg>
              </button>
              <button className="flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50">
                <svg className="h-5 w-5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button className="flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path d="M22.92 12.616c0-.867-.076-1.705-.228-2.511H12v4.746h6.092c-.261 1.424-1.058 2.63-2.257 3.437v2.856h3.653c2.14-1.97 3.373-4.874 3.373-8.528z" fill="#4285F4"/>
                  <path d="M12 23c3.05 0 5.614-1.014 7.49-2.74l-3.654-2.856c-1.012.68-2.31 1.083-3.836 1.083-2.953 0-5.447-1.995-6.34-4.674H1.723v2.95C3.587 20.319 7.427 23 12 23z" fill="#34A853"/>
                  <path d="M5.66 13.813c-.226-.678-.356-1.403-.356-2.146s.13-1.468.356-2.146V6.57H1.723C.96 8.204.5 10.041.5 12c0 1.96.46 3.796 1.223 5.43l3.937-2.956z" fill="#FBBC05"/>
                  <path d="M12 5.18c1.664 0 3.154.572 4.325 1.695l3.244-3.242C17.5 1.73 14.96.5 12 .5c-4.573 0-8.413 2.681-10.277 6.57l3.938 2.956C6.553 7.175 9.047 5.18 12 5.18z" fill="#EA4335"/>
                </svg>
              </button>
            </div>
            
            <p className="mt-8 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-green-600 hover:text-green-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="text-center mt-auto pb-6 text-sm text-gray-600">
        <p>&copy; 2025 AgriStore. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Register;