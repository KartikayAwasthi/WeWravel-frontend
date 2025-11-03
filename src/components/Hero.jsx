import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden">
      {/* === Background Layer === */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=90"
          alt="Futuristic Travel Background"
          className="w-full h-full object-cover opacity-40 scale-110"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />
      </div>

      {/* === Decorative Glows === */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-yellow-400/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[160px]" />

      {/* === Main Content === */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6 max-w-3xl"
      >
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="uppercase text-yellow-400 tracking-[0.3em] text-xs md:text-sm mb-4"
        >
          Where Dreams Meet Destinations
        </motion.p>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6"
        >
          <span className="text-yellow-400 drop-shadow-[0_0_25px_rgba(255,221,0,0.6)]">
            Explore
          </span>{" "}
          the World<br /> with{" "}
          <span className="text-white">WeWravel</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed"
        >
          Experience futuristic travel planning — from hidden wonders to iconic
          landmarks, curated just for your next unforgettable journey.
        </motion.p>

        {/* === Action Buttons === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap gap-5 justify-center"
        >
          {/* Primary CTA */}
          <motion.a
            href="trips"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 bg-yellow-400 text-black px-7 py-3 rounded-full font-semibold shadow-[0_0_20px_rgba(255,221,0,0.7)] hover:shadow-[0_0_35px_rgba(255,221,0,1)] transition-all duration-300"
          >
            <MapPin className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Explore Now
          </motion.a>

          {/* Secondary CTA */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 border border-yellow-400/40 text-white px-7 py-3 rounded-full font-semibold hover:bg-yellow-400/10 transition-all duration-300 backdrop-blur-md"
          >
            Contact Us
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 text-yellow-400" />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* === Scroll Indicator === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-gray-300 text-sm"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-wider">
            Scroll to Explore
          </span>
          <div className="w-[2px] h-8 bg-yellow-400/70 rounded-full"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
