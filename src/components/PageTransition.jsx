import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

const PageTransition = () => {
  const location = useLocation();
  const [show, setShow] = useState(false);
// 🌍 Beautiful random taglines
const taglines = [
  "🌍 Adventure is calling — are you ready to answer? ✈️",
  "🏔️ The world is too beautiful to stay in one place! 🌄",
  "🌅 Collect moments, not things — chase every sunrise! ✨",
  "🌊 Let’s wander where the WiFi is weak and the vibes are strong. 🌴",
  "🚗 Roads are made for journeys, not destinations. 🗺️",
  "✨ Escape the ordinary, embrace the unknown. 🌌",
  "🎒 Pack light, travel far, and live loud! 🌍❤️",
  "🏕️ Find your wild side — adventure awaits! 🧭",
  "🌄 Wander often, wonder always. 💫",
  "🌍 Life’s short — make every trip a story worth telling. 📸✈️",
  "🌎 The journey of a thousand miles begins with a single step. 👣",
  "🗺️ Not all those who wander are lost. 🌌",
  "🌞 To travel is to live — keep exploring! 🌈",
  "🌠 Let’s find some beautiful place to get lost. 🧭",
  "🔥 If you think adventure is dangerous, try routine. 💨",
  "🍃 Take only memories, leave only footprints. 👣",
  "🌈 Go where you feel most alive. 🌤️",
  "🌍 Travel far enough, you meet yourself. 💫",
  "🧭 Live your life by a compass, not a clock. 🕊️",
  "🌴 Escape and breathe the air of new places. 🌺",
  "🏞️ Blessed are the curious — for they shall have adventures. ✨",
  "🚙 Adventure awaits — go find it! 🌍",
  "🪶 Wander more, worry less. 🌸",
  "🌌 Fill your life with experiences, not things. 💖",
  "🌄 We travel not to escape life, but for life not to escape us. 🌞",
];


  const randomTagline = taglines[Math.floor(Math.random() * taglines.length)];

  // ⚡ Trigger transition on page change
  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => setShow(false), 1600);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key={location.pathname}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-black via-[#0a0a0a] to-[#1a1a1a] overflow-hidden"
        >
          {/* ✨ Floating Golden Dust Particles */}
          {[...Array(25)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute bg-yellow-400/25 rounded-full blur-sm"
              style={{
                width: Math.random() * 3 + 2,
                height: Math.random() * 3 + 2,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: Math.random() * 5 + 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* 🌟 Center Logo + Ring Animation */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.3, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative flex flex-col items-center justify-center"
          >
            {/* Rotating Outer Halo */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute w-48 h-48 border border-yellow-400/40 rounded-full blur-[1px]"
            ></motion.div>

            {/* Radiant Inner Glow */}
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute w-36 h-36 bg-yellow-400/10 rounded-full blur-3xl"
            ></motion.div>

            {/* ✨ Glowing Logo */}
            <motion.img
              src="/logo/logo.webp"
              alt="WeWravel Logo"
              className="w-24 h-24 rounded-full object-contain shadow-[0_0_40px_rgba(255,221,0,0.9)] border border-yellow-400/40"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />

            {/* Shining Sweep Beam */}
            <motion.div
              className="absolute w-32 h-[2px] bg-gradient-to-r from-transparent via-yellow-300 to-transparent"
              animate={{ x: ["-150%", "150%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />

            {/* 🧭 Random Tagline */}
            <motion.p
              key={randomTagline}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-yellow-400 text-sm sm:text-base tracking-[0.1em] font-semibold text-center"
            >
              {randomTagline}
            </motion.p>
          </motion.div>

          {/* Ambient Soft Glow Pulse */}
          <motion.div
            animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute w-72 h-72 bg-yellow-400/10 rounded-full blur-[100px]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;
