import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  function updateQty(i, delta) {
    const c = [...cart];
    c[i].qty = Math.max(1, c[i].qty + delta);
    setCart(c);
    localStorage.setItem('cart', JSON.stringify(c));
  }

  function removeItem(i) {
    const c = cart.filter((_, idx) => idx !== i);
    setCart(c);
    localStorage.setItem('cart', JSON.stringify(c));
  }

  const total = cart.reduce((s, it) => s + it.price * it.qty, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 p-6 md:p-10">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 md:p-10">
        <h2 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-400 mb-8">
          🛒 Your Shopping Cart
        </h2>

        {cart.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 text-lg">
            Your cart is empty. <br />
            <button
              onClick={() => navigate('/')}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow"
            >
              Browse Books
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-5">
              {cart.map((it, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row items-center gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <img
                    src={ 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLsmbMA9KeasrMpA3pxclfQXx_aZ17qEPueb63FD1uqZIRDDsdQxeyLr0&s' }
                    className="w-28 h-40 object-cover rounded-lg shadow-md"
                    alt={it.title}
                  />
                  <div className="flex-1 text-center md:text-left space-y-1">
                    <div className="text-lg font-semibold text-blue-700 dark:text-blue-400">{it.title}</div>
                    <div className="text-gray-600 dark:text-gray-300">Rs {it.price}</div>
                  </div>

                  <div className="flex items-center justify-center gap-3 mt-2 md:mt-0">
                    <button
                      onClick={() => updateQty(idx, -1)}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
                    >
                      −
                    </button>
                    <span className="text-lg font-semibold">{it.qty}</span>
                    <button
                      onClick={() => updateQty(idx, 1)}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(idx)}
                      className="ml-4 text-red-600 hover:text-red-500 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-right space-y-3">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                Total: Rs {total}
              </div>
              <button
                onClick={() => navigate('/checkout')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
