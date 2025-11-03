import React from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const links = ["Home", "Destinations", "Testimonials", "About", "Contact"];

  return (
    <footer className="bg-gradient-to-r from-black via-[#0a0a0a] to-black text-white py-12 px-8 border-t border-yellow-400/20">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
    {/* Logo */}
    <div className="flex flex-col items-center md:items-start">
      <img
        src="/logo/logo.webp"
        alt="WeWravel Logo"
        className="w-21 h-21 mb-3 rounded-full border border-yellow-400 shadow-[0_0_15px_rgba(255,221,0,0.8)]"
      />
      
      <p className="text-gray-400 text-sm mt-2 max-w-xs">
        Your next journey starts with us — travel smart, travel modern.
      </p>
    </div>

    {/* Quick Links */}
    <div className="text-center">
      <h3 className="text-yellow-400 text-lg font-semibold mb-4">
        Quick Links
      </h3>
      <div className="flex flex-col gap-2 text-sm">
        {["Home", "Destinations", "Testimonials", "About", "Contact"].map((item) => (
          <Link
            key={item}
            to={`/${item.toLowerCase()}`}
            className="text-white/80 hover:text-yellow-400 transition"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>

    {/* Social */}
    <div className="flex flex-col items-center md:items-end">
      <h3 className="text-yellow-400 text-lg font-semibold mb-4">Connect</h3>
      <div className="flex gap-5">
        {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
          <a key={i} href="#" className="text-yellow-400 hover:text-yellow-300">
            <Icon size={24} />
          </a>
        ))}
      </div>
    </div>
  </div>

  <div className="border-t border-yellow-400/20 mt-8 text-center text-sm text-gray-400 pt-4">
    © {new Date().getFullYear()} WeWravel — Crafted with 💛 by Kartikay Awasthi
  </div>
</footer>

  );
};

export default Footer;
