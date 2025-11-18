import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout, isAdmin } from '../utils/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

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

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wide drop-shadow-md hover:scale-105 transition-transform duration-300"
        >
          BookStore
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Hi username (visible on desktop + mobile) */}
          {auth && (
            <span className="hidden sm:block text-yellow-100 font-medium">
              Hi, {name || "User"}
            </span>
          )}

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-6">

            <Link to="/" className="font-semibold hover:text-yellow-300 transition duration-300">
              Home
            </Link>

            <Link to="/cart" className="font-semibold hover:text-yellow-300 transition duration-300">
              Cart
            </Link>

            <Link to="/contact" className="font-semibold hover:text-yellow-300 transition duration-300">
              Contact
            </Link>

            {admin && (
              <Link to="/admin" className="font-semibold hover:text-yellow-300 transition duration-300">
                Admin
              </Link>
            )}

            {auth ? (
              <>
                <button
                  onClick={doLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full shadow-lg transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="font-semibold hover:text-yellow-300 transition duration-300">
                  Login
                </Link>
                <Link to="/register" className="font-semibold hover:text-yellow-300 transition duration-300">
                  Register
                </Link>
              </>
            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden flex flex-col gap-1 px-3 py-2 bg-white/20 rounded-md backdrop-blur hover:bg-white/30"
          >
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
            <span className="w-6 h-0.5 bg-white"></span>
          </button>

        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="sm:hidden bg-white/20 backdrop-blur-md px-6 py-4 flex flex-col gap-3 text-white">

          <Link to="/" onClick={() => setOpen(false)} className="font-semibold">Home</Link>
          <Link to="/cart" onClick={() => setOpen(false)} className="font-semibold">Cart</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="font-semibold">Contact</Link>

          {admin && (
            <Link to="/admin" onClick={() => setOpen(false)} className="font-semibold">Admin</Link>
          )}

          {auth ? (
            <button
              onClick={() => {
                doLogout();
                setOpen(false);
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="font-semibold">Login</Link>
              <Link to="/register" onClick={() => setOpen(false)} className="font-semibold">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
