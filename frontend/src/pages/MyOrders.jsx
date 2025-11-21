import React, { useEffect, useState } from 'react';
import api from '../api';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  async function loadOrders() {
    try {
      // FIXED ROUTE
      const res = await api.get('/api/orders');
      setOrders(res.data);
    } catch (err) {
      alert(err?.response?.data?.message || err.message);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 text-white p-6">
      <h2 className="text-3xl font-bold text-center mb-6 drop-shadow">
        📦 My Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-white/80 mt-10">
          You haven’t placed any orders yet.
        </p>
      ) : (
        <div className="space-y-4 max-w-3xl mx-auto">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white/20 backdrop-blur-lg p-4 rounded-xl shadow-lg"
            >
              <div className="flex justify-between">
                <span className="font-bold">Order ID:</span>
                <span>{order._id}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span className="font-bold">Status:</span>
                <span className="text-yellow-300 font-semibold">
                  {order.status}
                </span>
              </div>

              <div className="mt-3">
                <h4 className="font-semibold mb-1">Items:</h4>
                {order.items.map((it, index) => (
                  <div key={index} className="text-sm text-white/90">
                    {it.title} x {it.qty}
                  </div>
                ))}
              </div>

              <div className="text-right font-bold mt-3">
                Total: Rs {order.totalPrice}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
