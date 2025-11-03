import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Send } from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form Data:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0b0b] to-[#1a1a1a] text-gray-300 relative overflow-hidden">
      {/* 🌟 Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,221,0,0.1),transparent_70%)] blur-3xl"></div>

      {/* 💬 Hero Section */}
      <section className="text-center py-20 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-[0_0_15px_rgba(255,221,0,0.3)]"
        >
          Get in <span className="text-yellow-400">Touch</span> With Us 🌍
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto text-gray-400 text-lg"
        >
          Have questions, trip ideas, or partnership proposals?  
          <span className="text-yellow-400 font-semibold"> WeWravel</span> would love to hear from you — let’s create something unforgettable together!
        </motion.p>
      </section>

      {/* 💼 Contact Section (Left Info + Right Form) */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-6 mb-20">
        {/* Left: Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center bg-black/40 border border-yellow-400/20 backdrop-blur-lg rounded-3xl p-10 shadow-[0_0_40px_rgba(255,221,0,0.1)]"
        >
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">Reach Us 📍</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="w-7 h-7 text-yellow-400" />
              <div>
                <h3 className="text-lg font-semibold text-white">Visit Us</h3>
                <p className="text-gray-400">
                  Wanderlust Avenue, Connaught Place,
                  <br /> New Delhi, India – 110001
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-7 h-7 text-yellow-400" />
              <div>
                <h3 className="text-lg font-semibold text-white">Email</h3>
                <a
                  href="mailto:support@wewravel.com"
                  className="text-gray-400 hover:text-yellow-300 transition"
                >
                  support@wewravel.com
                </a>
                <p className="text-sm text-gray-500 mt-1">We reply within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-7 h-7 text-yellow-400" />
              <div>
                <h3 className="text-lg font-semibold text-white">Call</h3>
                <a
                  href="tel:+911234567890"
                  className="text-gray-400 hover:text-yellow-300 transition"
                >
                  +91 12345 67890
                </a>
                <p className="text-sm text-gray-500 mt-1">
                  Mon – Sat: 9:00 AM – 7:00 PM
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-[#141414]/60 to-[#1e1e1e]/60 border border-yellow-400/20 backdrop-blur-xl rounded-3xl p-10 shadow-[0_0_40px_rgba(255,221,0,0.15)]"
        >
          <h2 className="text-3xl font-bold text-center text-yellow-400 mb-6">
            Send a Message ✉️
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 text-white placeholder-gray-400 border border-yellow-400/10 focus:outline-none focus:border-yellow-400 transition"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2 text-sm font-medium">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 text-white placeholder-gray-400 border border-yellow-400/10 focus:outline-none focus:border-yellow-400 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2 text-sm font-medium">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="Type your message..."
                required
                className="w-full px-4 py-3 rounded-lg bg-white/5 text-white placeholder-gray-400 border border-yellow-400/10 focus:outline-none focus:border-yellow-400 transition resize-none"
              ></textarea>
            </div>

            <motion.button
              type="submit"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 25px rgba(255,221,0,0.7)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 rounded-lg text-black font-semibold tracking-wide shadow-[0_0_15px_rgba(255,221,0,0.4)] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Send size={18} />
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </section>

      {/* 🗺️ Map Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl overflow-hidden border border-yellow-400/20 shadow-[0_0_40px_rgba(255,221,0,0.1)]"
        >
          <iframe
            title="WeWravel Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.467060355269!2d77.21672117527593!3d28.5832155756968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2f3e1e36a4b%3A0x8aef8de81a57a003!2sConnaught%20Place%2C%20New%20Delhi!5e0!3m2!1sen!2sin!4v1719871234567!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="w-full h-[400px]"
          ></iframe>
        </motion.div>
      </section>

   
    </div>
  );
};

export default ContactUs;
