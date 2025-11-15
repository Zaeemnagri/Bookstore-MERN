import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { isAuthenticated } from '../utils/auth';

export default function BookDetails(){
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  async function load(){
    const res = await api.get(`/api/books/${id}`);
    setBook(res.data);
    const rev = await api.get(`/api/reviews/${id}`);
    setReviews(rev.data);
  }

  useEffect(()=>{ load(); }, [id]);

  async function addReview(e){
    e.preventDefault();
    if(!isAuthenticated()) { alert('Login to review'); return; }
    try { await api.post(`/api/reviews/${id}`, { rating, comment }); setComment(''); setRating(5); load(); } catch(err){ alert(err?.response?.data?.message || err.message); }
  }

  async function addToCart(){
    if(!isAuthenticated()){ alert('Login to add to cart'); return; }
    try { await api.post('/api/cart/add', { bookId: id, qty: 1 });
      const cart = JSON.parse(localStorage.getItem('cart')||'[]');
      cart.push({ bookId: id, title: book.title, price: book.price, qty: 1, coverUrl: book.coverUrl });
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Added to cart');
    } catch(err){ alert(err?.response?.data?.message || err.message); }
  }

  if(!book) return <div>Loading...</div>;
  const cover = book.coverUrl ? (book.coverUrl.startsWith('/uploads') ? `${process.env.REACT_APP_API || 'http://localhost:5000'}${book.coverUrl}` : book.coverUrl) : 'https://via.placeholder.com/300x420?text=Cover';

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div><img src={cover} alt={book.title} className="w-full h-auto rounded" /></div>
      <div className="md:col-span-2">
        <h1 className="text-3xl font-bold">{book.title}</h1>
        <p className="text-gray-600">By {book.author}</p>
        <p className="mt-4">{book.description}</p>
        <div className="mt-4 flex items-center gap-4">
          <div className="text-2xl font-bold text-blue-600">Rs {book.price}</div>
          <div className="text-sm text-gray-500">{book.stock > 0 ? 'In stock' : 'Out of stock'}</div>
        </div>
        <div className="mt-4 flex gap-2">
          <button onClick={addToCart} className="bg-blue-600 text-white px-4 py-2 rounded">Add to Cart</button>
          <button onClick={async ()=>{ if(!isAuthenticated()){ alert('Login to wishlist'); return; } await api.post(`/api/wishlist/toggle/${id}`); alert('Wishlist toggled'); }} className="px-4 py-2 rounded border">Wishlist</button>
        </div>

        <hr className="my-6" />
        <h3 className="text-xl font-semibold">Reviews</h3>
        <div className="mt-4 space-y-4">
          {reviews.map(r=>(
            <div key={r._id} className="p-3 bg-white rounded shadow">
              <div className="flex justify-between"><strong>{r.user?.name || 'User'}</strong><span>{r.rating}★</span></div>
              <p className="text-sm">{r.comment}</p>
            </div>
          ))}
        </div>

        <form onSubmit={addReview} className="mt-4">
          <h4 className="font-semibold">Leave a review</h4>
          <select value={rating} onChange={e=>setRating(Number(e.target.value))} className="p-2 rounded border mt-2">
            {[5,4,3,2,1].map(n=> <option key={n} value={n}>{n} stars</option>)}
          </select>
          <textarea value={comment} onChange={e=>setComment(e.target.value)} className="w-full mt-2 p-2 border rounded" placeholder="Write your thoughts..." />
          <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded">Post Review</button>
        </form>
      </div>
    </div>
  );
}
