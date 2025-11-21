// frontend/src/pages/AdminReviews.jsx
import React, { useEffect, useState } from 'react';
import api from '../api';

export default function AdminReviews(){
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  async function load(){
    setLoading(true);
    try {
      const res = await api.get('/api/admin/reviews');
      setReviews(res.data.data || res.data);
    } catch(err){
      alert(err?.response?.data?.message || err.message);
    } finally { setLoading(false); }
  }

  async function remove(id){
    if(!window.confirm('Delete this review?')) return;
    try {
      await api.delete(`/api/admin/reviews/${id}`);
      setReviews(reviews.filter(r=>r._id !== id));
    } catch(err){
      alert(err?.response?.data?.message || err.message);
    }
  }

  useEffect(()=>{ load(); }, []);

  return (
    <div className="p-8 min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">⭐ Reviews</h1>

      <div className="max-w-5xl mx-auto space-y-4">
        {loading ? <div>Loading...</div> : reviews.length===0 ? <div className="text-center opacity-80">No reviews.</div> :
          reviews.map(r=>(
            <div key={r._id} className="bg-white/10 p-4 rounded-xl shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">{r.user?.name || 'User'}</div>
                  <div className="text-sm text-gray-200">{r.user?.email}</div>
                  <div className="text-sm mt-1">Book: {r.book?.title || 'Unknown'}</div>
                </div>
                <div className="text-right">
                  <div className="text-yellow-300 font-bold">{r.rating}★</div>
                  <div className="mt-2">
                    <button onClick={()=>remove(r._id)} className="px-3 py-1 bg-red-500 rounded">Delete</button>
                  </div>
                </div>
              </div>
              <p className="mt-3">{r.comment}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}
