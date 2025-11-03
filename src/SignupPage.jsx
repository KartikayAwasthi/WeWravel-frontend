import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loaderActive, setLoaderActive] = useState(false);
  const [message, setMessage] = useState("Creating your account...");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const messages = [
    "🚀 Setting up your travel adventure...",
    "🧳 Packing your digital backpack...",
    "🌍 Connecting you to breathtaking destinations...",
    "✨ Almost there, final touches...",
    "🎉 Welcome to WeWravel!",
  ];

  // Progress bar animation
  useEffect(() => {
    if (loaderActive) {
      let percent = 0;
      const interval = setInterval(() => {
        percent += 2;
        setProgress(percent);
        if (percent < 100) {
          const index = Math.floor(percent / 20);
          setMessage(messages[index]);
        }
        if (percent >= 100) {
          clearInterval(interval);
          navigate("/login");
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [loaderActive, navigate]);

  // Form handlers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { name, contactNumber, email, password } = formData;

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!/^[0-9]{10}$/.test(contactNumber))
      newErrors.contactNumber = "Enter a valid 10-digit contact number.";
    if (!emailPattern.test(email))
      newErrors.email = "Please enter a valid email.";
    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: "", contactNumber: "", email: "", password: "" });
        setErrors({});
        setLoaderActive(true); // Show loader
      } else {
        const errorText = await response.text();
        alert("❌ Signup Failed: " + errorText);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0a0a0a] to-[#1a1a1a] px-4 overflow-hidden">
      {/* 🌍 Interactive Loader Overlay */}
      <AnimatePresence>
        {loaderActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md text-center"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-80"
            >
              <h2 className="text-3xl font-bold text-yellow-400 mb-4">
                {Math.min(progress, 100)}%
              </h2>
              <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.05 }}
                  className="h-full bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.9)]"
                />
              </div>
              <p className="text-gray-300 mt-4 text-sm italic">{message}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🟡 Signup Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-black/80 border border-yellow-400/30 rounded-2xl p-8 shadow-[0_0_30px_rgba(255,221,0,0.2)] backdrop-blur-xl z-10"
      >
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-extrabold text-center text-white mb-6"
        >
          Create Your <span className="text-yellow-400">WeWravel</span> Account
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-yellow-400 mb-2 text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`w-full px-4 py-2 rounded-lg bg-white/5 text-white placeholder-gray-400 border ${
                errors.name ? "border-red-500" : "border-yellow-400/20"
              } focus:outline-none focus:border-yellow-400 transition`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-yellow-400 mb-2 text-sm font-medium">
              Contact Number
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Enter 10-digit number"
              maxLength={10}
              className={`w-full px-4 py-2 rounded-lg bg-white/5 text-white placeholder-gray-400 border ${
                errors.contactNumber ? "border-red-500" : "border-yellow-400/20"
              } focus:outline-none focus:border-yellow-400 transition`}
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-yellow-400 mb-2 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full px-4 py-2 rounded-lg bg-white/5 text-white placeholder-gray-400 border ${
                errors.email ? "border-red-500" : "border-yellow-400/20"
              } focus:outline-none focus:border-yellow-400 transition`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-yellow-400 mb-2 text-sm font-medium">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              className={`w-full px-4 py-2 rounded-lg bg-white/5 text-white placeholder-gray-400 border ${
                errors.password ? "border-red-500" : "border-yellow-400/20"
              } focus:outline-none focus:border-yellow-400 transition`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-yellow-400 hover:text-white transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full py-2 bg-[#22c55e] hover:bg-[#16a34a] disabled:bg-gray-700 rounded-lg text-white font-semibold tracking-wide shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:shadow-[0_0_30px_rgba(34,197,94,0.8)] transition-all duration-300"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </motion.button>
        </form>

        <p className="text-sm text-center text-gray-400 mt-5">
          Already have an account?{" "}
          <a href="/login" className="text-yellow-400 hover:text-white">
            Log In
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
