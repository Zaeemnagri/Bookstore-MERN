import React, { useEffect, useState } from 'react';
import api from '../api';

export default function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: '',
    author: '',
    price: 0,
    stock: 0,
    category: '',
    language: '',
    description: '',
    coverUrl: ''   // using URL instead of file
  });

  async function load() {
    try {
      const res = await api.get('/api/books');
      setBooks(res.data.data);
    } catch (err) {
      alert(err?.response?.data?.message || err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function create(e) {
    e.preventDefault();
    try {
      await api.post('/api/books', form);

      setForm({
        title: '',
        author: '',
        price: 0,
        stock: 0,
        category: '',
        language: '',
        description: '',
        coverUrl: ''
      });

      load();
    } catch (err) {
      alert(err?.response?.data?.message || err.message);
    }
  }

  async function remove(id) {
    if (!window.confirm('Delete this book?')) return;
    try {
      await api.delete(`/api/books/${id}`);
      load();
    } catch (err) {
      alert(err?.response?.data?.message || err.message);
    }
  }

  const inputClass =
    "w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-200 " +
    "focus:ring-2 focus:ring-pink-400 focus:border-pink-300 outline-none";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 bg-[length:200%_200%] animate-gradientMove p-8 text-white">
      <h2 className="text-4xl font-extrabold mb-8 text-center drop-shadow-lg">📘 Admin Dashboard</h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">

        {/* Left: Add Book */}
        <div className="md:col-span-1 bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all">
          <h3 className="text-2xl font-semibold mb-4 text-center">➕ Add New Book</h3>

          <form onSubmit={create} className="space-y-3">

            <input
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="Title"
              className={inputClass}
            />

            <input
              value={form.author}
              onChange={e => setForm({ ...form, author: e.target.value })}
              placeholder="Author"
              className={inputClass}
            />

            <input
              type="number"
              value={form.price}
              onChange={e => setForm({ ...form, price: Number(e.target.value) })}
              placeholder="Price"
              className={inputClass}
            />

            <input
              type="number"
              value={form.stock}
              onChange={e => setForm({ ...form, stock: Number(e.target.value) })}
              placeholder="Stock"
              className={inputClass}
            />

            <input
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              placeholder="Category"
              className={inputClass}
            />

            <input
              value={form.language}
              onChange={e => setForm({ ...form, language: e.target.value })}
              placeholder="Language"
              className={inputClass}
            />

            {/* Image URL */}
            <input
              value={form.coverUrl}
              onChange={e => setForm({ ...form, coverUrl: e.target.value })}
              placeholder="Image URL (https://...)"
              className={inputClass}
            />

            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Description"
              className={inputClass}
            />

            <button className="w-full bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-bold py-2 rounded-lg shadow-lg hover:opacity-90 transition">
              Add Book
            </button>
          </form>
        </div>

        {/* Right: Manage Books */}
        <div className="md:col-span-2 bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
          <h3 className="text-2xl font-semibold mb-4 text-center">📚 Manage Books</h3>

          {books.length === 0 ? (
            <p className="text-center text-gray-200">No books added yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {books.map(b => (
                <div
                  key={b._id}
                  className="bg-white/20 backdrop-blur-md rounded-xl p-4 flex justify-between items-center shadow-md hover:shadow-2xl transition"
                >
                  <div>
                    <div className="font-bold text-lg">{b.title}</div>
                    <div className="text-sm text-gray-200">{b.author}</div>
                  </div>
                  <button
                    onClick={() => remove(b._id)}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
