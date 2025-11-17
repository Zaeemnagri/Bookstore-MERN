import React, { useState } from "react";
import api from "../api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function sendMessage(e) {
    e.preventDefault();
    try {
      await api.post("/api/contact", form);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      alert("Failed to send message. Try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 p-8 text-white flex justify-center items-center">
      <div className="w-full max-w-xl backdrop-blur-lg bg-white/10 p-8 rounded-2xl border border-white/20 shadow-2xl">

        <h1 className="text-3xl font-bold text-center mb-6 drop-shadow-lg">
          📬 Contact Us
        </h1>

        <p className="text-center text-gray-200 mb-4">
          Have questions or suggestions? We’re here to listen.
        </p>

        {/* Success Message */}
        {sent && (
          <div className="text-green-300 text-center mb-4 font-semibold">
            ✔ Your message has been sent!
          </div>
        )}

        <form onSubmit={sendMessage} className="flex flex-col gap-4">
          <input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="p-3 rounded-lg text-gray-900 bg-white shadow-md focus:outline-none"
          />

          <input
            name="email"
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="p-3 rounded-lg text-gray-900 bg-white shadow-md focus:outline-none"
          />

          <textarea
            name="message"
            rows="4"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            className="p-3 rounded-lg text-gray-900 bg-white shadow-md focus:outline-none"
          ></textarea>

          <button className="bg-yellow-400 text-black py-3 rounded-lg font-bold shadow-lg hover:bg-yellow-500 transition transform hover:scale-105">
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="mt-8 text-center text-white/90">
          <p className="font-semibold text-lg">📞 Contact Number:</p>
          <p className="mb-2">0330-1234567</p>

          <p className="font-semibold text-lg">📧 Email:</p>
          <p>bookstore.help@gmail.com</p>
        </div>

      </div>
    </div>
  );
}

