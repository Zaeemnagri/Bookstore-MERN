import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Contact from './pages/Contact';
import AdminOrders from './pages/AdminOrders';
import AdminReviews from './pages/AdminReviews';
import MyOrders from './pages/MyOrders';



import { isAuthenticated, isAdmin } from './utils/auth';

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}
function AdminRoute({ children }) {
  return isAuthenticated() && isAdmin() ? children : <Navigate to="/login" />;
}

export default function App(){
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<PrivateRoute><CartPage/></PrivateRoute>} />
          <Route path="/checkout" element={<PrivateRoute><Checkout/></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard/></AdminRoute>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/reviews" element={<AdminReviews />} />
          <Route path="/my-orders" element={<MyOrders />} />

          
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}
