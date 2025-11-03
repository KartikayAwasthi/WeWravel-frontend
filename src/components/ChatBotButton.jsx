import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Phone } from "lucide-react";

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;
    alert(`Message sent: ${message}`);
    setMessage("");
  };

  return (
    <>
      {/* === Floating Chatbot Button === */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 bg-yellow-400 p-4 rounded-full shadow-[0_0_25px_rgba(255,221,0,0.6)] hover:shadow-[0_0_35px_rgba(255,221,0,1)] transition-all duration-300"
        aria-label="Open Chat Assistant"
        title="Chat with WeWravel"
      >
        {isOpen ? (
          <X className="text-black w-6 h-6" />
        ) : (
          <MessageCircle className="text-black w-6 h-6" />
        )}
      </motion.button>

     

      {/* === Chat Popup === */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-50 w-80 bg-black/90 border border-yellow-400/30 backdrop-blur-lg rounded-2xl shadow-[0_0_30px_rgba(255,221,0,0.3)] overflow-hidden"
          >
            <div className="flex justify-between items-center px-4 py-3 border-b border-yellow-400/20">
              <h4 className="text-yellow-400 font-semibold text-lg">
                WeWravel Assistant
              </h4>
              <button
                onClick={() => setIsOpen(false)}
                className="text-yellow-400 hover:text-yellow-300 transition"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-4 h-48 overflow-y-auto text-gray-300 text-sm space-y-2">
              <p className="bg-yellow-400/10 text-yellow-200 p-2 rounded-lg w-fit">
                👋 Hi there! How can I help you today?
              </p>
              <p className="bg-yellow-400/10 text-yellow-200 p-2 rounded-lg w-fit">
                You can ask about destinations, packages, or bookings.
              </p>
            </div>

            <form
              onSubmit={handleSend}
              className="border-t border-yellow-400/20 p-3 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Type your question..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-transparent border border-yellow-400/20 text-white placeholder-gray-400 rounded-full px-3 py-2 text-sm focus:outline-none focus:border-yellow-400 transition"
              />
              <button
                type="submit"
                className="bg-yellow-400 text-black p-2 rounded-full hover:bg-yellow-300 transition"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotButton;
