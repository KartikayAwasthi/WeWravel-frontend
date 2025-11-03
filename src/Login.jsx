import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Loader states
  const [loaderActive, setLoaderActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Logging you in...");
  const navigate = useNavigate();

  const messages = [
    "🚀 Checking your credentials...",
    "🔐 Securing your session...",
    "🌍 Loading your dashboard...",
    "✨ Preparing your next adventure...",
    "🎉 Welcome back to WeWravel!",
  ];

  // Loader progress animation
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
          navigate("/dashboard");
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [loaderActive, navigate]);

  // Input handler
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!emailPattern.test(formData.email) || !formData.email.includes(".com"))
      newErrors.email = "Enter a valid email (must include @ and .com).";
    if (!formData.password.trim()) newErrors.password = "Password cannot be empty.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Login logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        // ✅ Store user and token
        localStorage.setItem("token", data.token || "dummy-token");
        localStorage.setItem("user", JSON.stringify(data.user));

        // ✅ Notify Navbar instantly
        window.dispatchEvent(new Event("user-login"));

        // Clear inputs and reset counters
        setFormData({ email: "", password: "" });
        setFailedAttempts(0);

        // ✅ Trigger animated loader
        setLoaderActive(true);
      } else {
        const errorText = await response.text();
        const newErrors = {};
        if (errorText.toLowerCase().includes("email"))
          newErrors.email = "❌ Invalid or unregistered email.";
        if (errorText.toLowerCase().includes("password"))
          newErrors.password = "❌ Incorrect password.";
        if (Object.keys(newErrors).length === 0)
          newErrors.general = "Invalid credentials. Please try again.";
        setErrors(newErrors);
        setFailedAttempts((prev) => prev + 1);
      }
    } catch {
      setErrors({
        general: "⚠️ Cannot connect to server. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Forgot password handler
  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert(`🔑 Password reset link sent to ${forgotEmail}`);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0a0a0a] to-[#1a1a1a] px-4">
      {/* 🌍 Loader Overlay */}
      <AnimatePresence>
        {loaderActive && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
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
                  className="h-full bg-green-500 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.9)]"
                />
              </div>
              <p className="text-gray-300 mt-4 text-sm italic">{message}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🟡 Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-black/80 border border-yellow-400/30 rounded-2xl p-8 shadow-[0_0_30px_rgba(255,221,0,0.2)] backdrop-blur-xl"
      >
        <h2 className="text-3xl font-extrabold text-center text-white mb-6">
          Welcome Back to <span className="text-yellow-400">WeWravel</span>
        </h2>

        {!showForgot ? (
          <form onSubmit={handleSubmit} className="space-y-5">
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
                placeholder="Enter your password"
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

            {/* Error */}
            {errors.general && (
              <p className="text-red-400 text-sm text-center mt-2">
                {errors.general}
              </p>
            )}

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => setShowForgot(true)}
                className="text-yellow-400 text-sm hover:text-white transition"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 bg-[#22c55e] hover:bg-[#16a34a] disabled:bg-gray-700 rounded-lg text-white font-semibold tracking-wide shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:shadow-[0_0_30px_rgba(34,197,94,0.8)] transition-all duration-300"
            >
              {loading ? "Verifying..." : "Log In"}
            </motion.button>

            {failedAttempts >= 3 && (
              <div className="text-center mt-4">
                <p className="text-gray-400 text-sm">
                  Having trouble logging in?
                </p>
                <button
                  type="button"
                  onClick={() => setShowForgot(true)}
                  className="text-yellow-400 font-semibold text-sm hover:text-white mt-1"
                >
                  Reset your password →
                </button>
              </div>
            )}
          </form>
        ) : (
          // Forgot Password Section
          <motion.form
            onSubmit={handleForgotPassword}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-5"
          >
            <p className="text-gray-300 text-sm text-center">
              Enter your registered email and we’ll send a reset link.
            </p>
            <div>
              <label className="block text-yellow-400 mb-2 text-sm font-medium">
                Email Address
              </label>
              <input
                type="email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                placeholder="Enter your registered email"
                required
                className="w-full px-4 py-2 rounded-lg bg-white/5 text-white placeholder-gray-400 border border-yellow-400/20 focus:outline-none focus:border-yellow-400 transition"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.6)] hover:shadow-[0_0_30px_rgba(34,197,94,0.9)] transition-all duration-300"
            >
              Send Reset Link
            </motion.button>
            <button
              type="button"
              onClick={() => setShowForgot(false)}
              className="block w-full text-center text-sm text-gray-400 hover:text-yellow-400 mt-2"
            >
              Back to Login
            </button>
          </motion.form>
        )}

        {/* Signup Redirect */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-center text-gray-400 mt-5"
        >
          Don’t have an account?{" "}
          <a href="/signup" className="text-yellow-400 hover:text-white">
            Sign Up
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
