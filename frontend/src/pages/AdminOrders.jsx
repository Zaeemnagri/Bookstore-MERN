import React, { useEffect, useState } from 'react';
import api from '../api';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await api.get('/api/admin/orders');
      setOrders(res.data.data || res.data);
    } catch (err) {
      alert(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id, status) {
    try {
      await api.put(`/api/admin/orders/${id}/status`, { status });
      load();
    } catch (err) {
      alert(err?.response?.data?.message || err.message);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">📦 Orders</h1>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="max-w-6xl mx-auto space-y-4">
          {orders.length === 0 ? (
            <div className="text-center opacity-80">No orders yet.</div>
          ) : (
            orders.map(order => (
              <div key={order._id} className="bg-white/10 p-4 rounded-xl shadow-md">

                {/* Top Section - Becomes stacked on mobile */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">

                  {/* Left Info */}
                  <div>
                    <div className="font-bold text-lg break-all">Order #{order._id}</div>
                    <div className="text-sm text-gray-200 break-all">
                      By: {order.user?.name || order.shippingAddress?.name} — {order.user?.email || ''}
                    </div>
                    <div className="text-sm mt-1">
                      {new Date(order.createdAt).toLocaleString()}
                    </div>
                  </div>

                  {/* Right Info (Status + Total) */}
                  <div className="text-left sm:text-right">
                    <div className="text-sm">
                      Total: <b>Rs {order.totalPrice}</b>
                    </div>

                    <div className="mt-2">
                      <span className="text-sm opacity-90">Status:</span>
                      <div className="mt-1">
                        <select
                          value={order.status}
                          onChange={(e) => updateStatus(order._id, e.target.value)}
                          className="p-2 rounded text-black w-full sm:w-auto"
                        >
                          <option>Pending</option>
                          <option>Shipped</option>
                          <option>Delivered</option>
                          <option>Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Shipping + Items Section */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* Shipping */}
                  <div className="bg-white/5 rounded-lg p-3">
                    <h4 className="font-semibold mb-1">Shipping</h4>
                    <p>{order.shippingAddress?.name}</p>
                    <p>{order.shippingAddress?.mobile}</p>
                    <p>{order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
                  </div>

                  {/* Items */}
                  <div className="bg-white/5 rounded-lg p-3">
                    <h4 className="font-semibold mb-1">Items</h4>
                    <div className="space-y-3">
                      {order.items.map((it, idx) => (
                        <div key={idx} className="flex items-center gap-3">

                          <img
                            src={it.coverUrl || 'https://via.placeholder.com/80x100'}
                            alt={it.title}
                            className="w-14 h-18 sm:w-16 sm:h-20 object-cover rounded"
                          />

                          <div className="flex-1">
                            <div className="font-semibold text-sm sm:text-base break-all">
                              {it.title}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-200">
                              {it.qty} × Rs {it.price}
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
