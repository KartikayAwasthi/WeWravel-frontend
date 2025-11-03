import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/trips" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  // ✅ Listen for user-login / logout events for instant updates
  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    updateUser();
    window.addEventListener("storage", updateUser);
    window.addEventListener("user-login", updateUser);
    window.addEventListener("user-logout", updateUser);

    return () => {
      window.removeEventListener("storage", updateUser);
      window.removeEventListener("user-login", updateUser);
      window.removeEventListener("user-logout", updateUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.dispatchEvent(new Event("user-logout"));
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-yellow-400/30 shadow-[0_2px_15px_rgba(255,221,0,0.15)]">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* 🔰 Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 hover:scale-105 transition-transform duration-300"
        >
          <motion.img
            src="/logo/logo.webp"
            alt="WeWravel Logo"
            className="w-10 h-10 rounded-full border border-yellow-400 shadow-[0_0_10px_rgba(255,221,0,0.6)] hover:shadow-[0_0_20px_rgba(255,221,0,0.9)]"
            whileHover={{ rotate: 10 }}
          />
        </Link>

        {/* 🌍 Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                className="relative text-white font-medium tracking-wide hover:text-yellow-400 transition-colors duration-300 after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-yellow-400 hover:after:w-full after:transition-all after:duration-300"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}

          {/* 👤 User / Login */}
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            <AnimatePresence mode="wait">
              {user ? (
                <motion.button
                  key="user"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-2 px-5 py-2 bg-yellow-400 text-black font-semibold rounded-full shadow-[0_0_15px_rgba(255,221,0,0.6)] hover:shadow-[0_0_25px_rgba(255,221,0,1)] transition-all duration-300"
                >
                  <User size={18} className="text-black" />
                  {user.name?.split(" ")[0] || "Traveler"} 👋
                </motion.button>
              ) : (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <Link
                    to="/login"
                    className="px-5 py-2 bg-yellow-400 text-black font-semibold rounded-full shadow-[0_0_15px_rgba(255,221,0,0.6)] hover:shadow-[0_0_25px_rgba(255,221,0,1)] transition-all duration-300 relative overflow-hidden"
                  >
                    Login
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 opacity-0 hover:opacity-100 transition-opacity duration-300"
                      animate={{ x: ["0%", "100%", "0%"] }}
                      transition={{ repeat: Infinity, duration: 5 }}
                    ></motion.span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* 📱 Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-yellow-400 hover:text-white transition-all"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 📱 Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/90 border-t border-yellow-400/20 backdrop-blur-md px-6 py-4 space-y-4 text-center"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="block text-white text-base font-semibold hover:text-yellow-400 transition-colors duration-300"
              >
                {item.name}
              </Link>
            ))}

            {user ? (
              <div>
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setIsOpen(false);
                  }}
                  className="inline-block mt-3 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full shadow-[0_0_20px_rgba(255,221,0,0.7)] transition-all duration-300"
                >
                  Hi, {user.name?.split(" ")[0] || "Traveler"} 👋
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-yellow-400 text-sm mt-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="inline-block mt-3 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-full shadow-[0_0_20px_rgba(255,221,0,0.7)] transition-all duration-300"
              >
                Login
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
