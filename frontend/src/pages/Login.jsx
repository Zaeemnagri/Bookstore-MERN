import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { saveAuth } from '../utils/auth';

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

  async function submit(e){
    e.preventDefault();
    try {
      const res = await api.post('/api/auth/login', { email, password });
      saveAuth(res.data);
      localStorage.setItem('role', res.data.role || 'customer');
      if(res.data.role === 'admin') navigate('/admin'); else navigate('/');
    } catch(err){ alert(err?.response?.data?.message || err.message); }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-2 border rounded" />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Sign in</button>
      </form>
    </div>
  );
}
