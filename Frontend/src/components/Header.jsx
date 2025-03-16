import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const dropdownRef = useRef(null); // Now this will work
    const navigate = useNavigate();
  
    // Check if user is logged in on component mount
    useEffect(() => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      }
    }, []);
  
    // Handle click outside to close dropdown
    useEffect(() => {
      function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setShowProfileDropdown(false);
        }
      }
      
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [dropdownRef]);
  
    // Handle logout
    const handleLogout = async () => {
      try {
        // Call logout API
        await fetch('/api/auth/logout', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          credentials: 'include'
        });
        
        // Clear local storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // Update state
        setIsAuthenticated(false);
        setUser(null);
        setShowProfileDropdown(false);
        
        // Redirect to home
        navigate('/');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };
  
    // Function to get user's initial
    const getUserInitial = () => {
      if (user && user.name) {
        return user.name.charAt(0).toUpperCase();
      }
      return "U"; // Default if name is not available
    };
  return (
    <div className="bg-gray-800 text-white text-sm py-2">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span>Download App</span>
          <span>|</span>
          <span>Farmer Helpline: 1800-123-4567</span>
        </div>
        <div className="flex items-center space-x-4">
          <a href="track-order" className="hover:text-green-300">
            Track Order
          </a>
          {isAuthenticated && user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="w-8 h-8 rounded-full bg-green-500 text-white font-semibold flex items-center justify-center hover:bg-green-600 transition"
                aria-label="User profile"
              >
                {getUserInitial()}
              </button>
              {showProfileDropdown && (
                <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-xl z-[60] border border-gray-200">
                  <div className="p-4 border-b">
                    <p className="font-semibold text-gray-800 truncate">
                      {user.name || "User"}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {user.email || "No email"}
                    </p>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      My Orders
                    </Link>
                    <Link
                      to="/wishlist"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Wishlist
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="hover:text-green-300">
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
