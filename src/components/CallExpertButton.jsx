import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X } from "lucide-react";

const CallExpertButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-42 right-6 z-[9999] flex flex-col items-end">
      {/* Floating Call Button with Golden Pulse */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            "0 0 10px rgba(255, 221, 0, 0.5)",
            "0 0 25px rgba(255, 221, 0, 0.9)",
            "0 0 10px rgba(255, 221, 0, 0.5)",
          ],
        }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="bg-yellow-400 text-black p-3 rounded-full shadow-[0_0_25px_rgba(255,221,0,0.6)] hover:shadow-[0_0_40px_rgba(255,221,0,1)] transition-all duration-300 flex items-center justify-center"
        aria-label="Call Travel Expert"
      >
        <Phone size={22} className="drop-shadow-md" />
      </motion.button>

      {/* Popup Info Card */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute bottom-16 right-0 w-80 bg-black/90 border border-yellow-400/30 rounded-2xl shadow-[0_0_25px_rgba(255,221,0,0.3)] backdrop-blur-xl p-5 text-white"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-yellow-400">
                Talk to Our Expert
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-yellow-400 hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <p className="text-sm text-gray-300 mb-4 leading-relaxed">
              Need help planning your next trip or looking for the best travel
              deals? Our certified{" "}
              <span className="text-yellow-400 font-semibold">
                WeWravel travel experts
              </span>{" "}
              are available <span className="text-yellow-400 font-semibold">24×7</span> to guide you personally.
            </p>

            {/* Call Action */}
            <div className="flex flex-col items-center justify-center gap-2">
              <a
                href="tel:+917355570155"
                className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg shadow-[0_0_20px_rgba(255,221,0,0.6)] hover:shadow-[0_0_30px_rgba(255,221,0,0.9)] transition-all duration-300"
              >
                <Phone size={18} /> Call Now: +91 7355570155
              </a>
              <p className="text-xs text-gray-400 italic text-center mt-1">
                Available for queries, bookings & expert guidance 🌍
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CallExpertButton;
