import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Checkout(){
  const [name,setName] = useState('');
  const [address,setAddress] = useState('');
  const [city,setCity] = useState('');
  const [postal,setPostal] = useState('');
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  const total = cart.reduce((s,it)=>s + (it.price * it.qty), 0);

  async function placeOrder(){
    try {
      const items = cart.map(it=>({ book: it.bookId, title: it.title, price: it.price, qty: it.qty, coverUrl: it.coverUrl }));
      const res = await api.post('/api/orders', { items, shippingAddress: { name, address, city, postalCode: postal, country: 'Pakistan' }, totalPrice: total });
      localStorage.removeItem('cart');
      alert('Order placed');
      navigate('/profile');
    } catch(err){ alert(err?.response?.data?.message || err.message); }
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="space-y-3">
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="w-full p-2 border rounded" />
        <input value={address} onChange={e=>setAddress(e.target.value)} placeholder="Address" className="w-full p-2 border rounded" />
        <div className="flex gap-2">
          <input value={city} onChange={e=>setCity(e.target.value)} placeholder="City" className="w-1/2 p-2 border rounded" />
          <input value={postal} onChange={e=>setPostal(e.target.value)} placeholder="Postal code" className="w-1/2 p-2 border rounded" />
        </div>
        <div className="text-right font-bold">Total: Rs {total}</div>
        <button onClick={placeOrder} className="w-full bg-green-600 text-white py-2 rounded">Place Order (Mock)</button>
      </div>
    </div>
  );
}
