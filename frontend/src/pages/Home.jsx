import React, { useEffect, useState } from 'react';
import api from '../api';
import BookCard from '../components/BookCard';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  async function loadBooks(p = 1) {
    setLoading(true);
    try {
      const res = await api.get(`/api/books?q=${encodeURIComponent(q)}&page=${p}&limit=12`);
      setBooks(res.data.data);
      setPage(res.data.page);
      setPages(res.data.pages);
    } catch (err) {
      alert(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBooks(1);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-[length:200%_200%] animate-gradientMove p-8 text-white transition-all duration-1000">
      {/* Hero Section */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 leading-tight">
         Discover Your Next Favorite Book 
        </h1>

        <p className="text-lg text-gray-100 mb-6">
          Explore bestsellers, new arrivals, and timeless classics crafted just for you.
        </p>

        <div className="flex justify-center gap-3 flex-wrap">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title or author..."
            className="w-full max-w-lg p-3 rounded-xl text-gray-900 focus:outline-none shadow-md bg-white placeholder-gray-500"
          />
          <button
            onClick={() => loadBooks(1)}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-xl shadow-lg transition-transform hover:scale-105"
          >
            Search
          </button>
        </div>
      </div>

      {/* Book Cards Section */}
      {loading ? (
        <div className="text-center text-xl font-semibold">Loading...</div>
      ) : (
        <>
          {books.length === 0 ? (
            <div className="text-center text-lg text-white/90 mt-10">No books found 🕊️</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {books.map((b) => (
                <BookCard key={b._id} book={b} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-10 flex justify-center items-center gap-4">
            <button
              onClick={() => loadBooks(Math.max(1, page - 1))}
              className="px-4 py-2 bg-white/20 hover:bg-white/40 text-white rounded-lg shadow transition"
            >
              Prev
            </button>
            <span className="text-lg font-semibold">
              Page {page} / {pages}
            </span>
            <button
              onClick={() => loadBooks(Math.min(pages, page + 1))}
              className="px-4 py-2 bg-white/20 hover:bg-white/40 text-white rounded-lg shadow transition"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
