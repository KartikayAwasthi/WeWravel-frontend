import React from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa"; // ✅ for authentic WhatsApp logo

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/919876543210" // 🔹 Replace with your WhatsApp number
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-24 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:shadow-[0_0_35px_rgba(37,211,102,0.9)] transition-all duration-300"
      title="Chat with us on WhatsApp"
    >
      <FaWhatsapp className="text-white w-7 h-7" />
    </motion.a>
  );
};

export default WhatsAppButton;
