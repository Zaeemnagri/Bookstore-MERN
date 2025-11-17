import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout, isAdmin } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const auth = isAuthenticated();
  const admin = isAdmin();
  const name = localStorage.getItem("name");

  const [menuOpen, setMenuOpen] = useState(false);

  function doLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 shadow-md text-white">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wide drop-shadow-md hover:scale-105 transition-transform duration-300"
        >
          BookStore
        </Link>

        {/* RIGHT SIDE ON NAVBAR */}
        <div className="flex items-center gap-4">

          {/* Show Hi, Username always */}
          {auth && (
            <span className="text-yellow-100 font-medium mr-2 sm:mr-3">
              Hi, {name || "User"}
            </span>
          )}


          {/* Desktop Menu Links */}
          <div className="hidden md:flex items-center gap-6">

            <Link to="/" className="font-semibold hover:text-yellow-300 transition">
              Home
            </Link>

            <Link to="/cart" className="font-semibold hover:text-yellow-300 transition">
              Cart
            </Link>

            {admin && (
              <Link to="/admin" className="font-semibold hover:text-yellow-300 transition">
                Admin
              </Link>
            )}

            {auth ? (
              <button
                onClick={doLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded-full shadow-lg transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="font-semibold hover:text-yellow-300 transition">
                  Login
                </Link>
                <Link to="/register" className="font-semibold hover:text-yellow-300 transition">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white text-3xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ⋮
          </button>
        </div>
      </div>

      {/* Mobile Dropdown (No Hi, Username here) */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 shadow-lg p-4 space-y-3 animate-fadeIn">

          <Link
            to="/"
            className="block font-semibold hover:text-yellow-300 transition"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/cart"
            className="block font-semibold hover:text-yellow-300 transition"
            onClick={() => setMenuOpen(false)}
          >
            Cart
          </Link>

          {admin && (
            <Link
              to="/admin"
              className="block font-semibold hover:text-yellow-300 transition"
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </Link>
          )}

          {auth ? (
            <button
              onClick={() => {
                doLogout();
                setMenuOpen(false);
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-full shadow"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="block font-semibold hover:text-yellow-300 transition"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="block font-semibold hover:text-yellow-300 transition"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
