import React from 'react';
import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  const cover = book.coverUrl
    ? (book.coverUrl.startsWith('/uploads')
        ? `${process.env.REACT_APP_API || 'http://localhost:5000'}${book.coverUrl}`
        : book.coverUrl)
    : 'https://png.pngtree.com/png-vector/20250513/ourmid/pngtree-colorful-books-pens-and-ruler-back-to-school-stationery-png-image_16265965.png';

  return (
    <Link to={`/books/${book._id}`}>
      <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 relative">
        <img
          src={cover}
          alt={book.title}
          className="w-full h-64 object-cover filter brightness-90"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 text-white backdrop-blur-sm">
          <h3 className="font-semibold text-lg">{book.title}</h3>
          <p className="text-sm text-gray-200">{book.author}</p>
          <div className="flex items-center justify-between mt-2">
            <div className="font-bold text-yellow-300">Rs {book.price}</div>
            <div className={`text-sm font-medium ${book.stock > 0 ? 'text-green-300' : 'text-red-400'}`}>
              {book.stock > 0 ? 'In stock' : 'Out of stock'}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
