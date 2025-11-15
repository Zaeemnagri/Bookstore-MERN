import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Profile(){
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  async function load(){
    try {
      const me = await api.get('/api/auth/me');
      setUser(me.data.user);
      const ord = await api.get('/api/orders');
      setOrders(ord.data);
    } catch(err){ console.error(err); }
  }
  useEffect(()=>{ load(); }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {user && <div className="mb-4">Hello, <strong>{user.name}</strong> ({user.email})</div>}
      <h3 className="text-xl font-semibold mb-2">Your Orders</h3>
      <div className="space-y-4">
        {orders.length===0 ? <div>No orders</div> : orders.map(o=>(
          <div key={o._id} className="bg-white p-3 rounded shadow">
            <div className="flex justify-between">
              <div>{new Date(o.createdAt).toLocaleString()}</div>
              <div className="font-semibold">{o.status}</div>
            </div>
            <div className="mt-2">
              {o.items.map(it=> <div key={it.book} className="text-sm">{it.title} x {it.qty}</div>)}
            </div>
            <div className="mt-2 font-bold">Total: Rs {o.totalPrice}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
