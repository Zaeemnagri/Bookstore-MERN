import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout, isAdmin } from '../utils/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const auth = isAuthenticated();
  const admin = isAdmin();
  const name = localStorage.getItem('name');
  

  function doLogout() {
    logout();
    navigate('/');
    
  }

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 shadow-md backdrop-blur-md text-white">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-3xl font-extrabold tracking-wide drop-shadow-md hover:scale-105 transition-transform duration-300"
        >
          BookStore
        </Link>

        <div className="flex items-center gap-6">
          <Link 
            to="/" 
            className="font-semibold hover:text-yellow-300 transition duration-300"
          >
            Home
          </Link>
          <Link 
            to="/cart" 
            className="font-semibold hover:text-yellow-300 transition duration-300"
          >
            Cart
          </Link>
          {admin && (
            <Link 
              to="/admin" 
              className="font-semibold hover:text-yellow-300 transition duration-300"
            >
              Admin
            </Link>
          )}
          
          {auth ? (
            <>
              <span className="text-yellow-100 font-medium">Hi, {name || 'User'}</span>
              <button
                onClick={doLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full shadow-lg transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="font-semibold hover:text-yellow-300 transition duration-300"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="font-semibold hover:text-yellow-300 transition duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
