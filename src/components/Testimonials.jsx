import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Aarav Patel",
    location: "Jibhi, Himachal Pradesh",
    image:
      "https://media1.thrillophilia.com/filestore/il3s16vm9ah504t7iipxvicvfack_4173506243_a74879328a_b.jpg", // ✅ Jibhi
    avatar: "https://randomuser.me/api/portraits/men/18.jpg",
    review:
      "Jibhi felt like a fairytale — pine forests, wooden cottages, and silent waterfalls. WeWravel curated a journey that helped me truly disconnect and breathe in nature.",
    rating: 5,
  },
  {
    name: "Meera Iyer",
    location: "McLeodganj, Himachal Pradesh",
    image:
      "https://himtrek.co.in/wp-content/uploads/2025/06/McLeodganj-to-Bir.webp", // ✅ McLeodganj
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    review:
      "The calm monasteries and the view of Dhauladhar ranges from McLeodganj gave me peace I didn’t know I needed. WeWravel made the experience perfectly balanced between adventure and serenity.",
    rating: 5,
  },
  {
    name: "Rohit Verma",
    location: "Manali, Himachal Pradesh",
    image:
      "https://himachaltourism.gov.in/wp-content/uploads/2019/04/Solang-Valley-Manali.jpg", // ✅ Manali
    avatar: "https://randomuser.me/api/portraits/men/47.jpg",
    review:
      "Snow peaks, cozy cafes, and starry skies — Manali through WeWravel’s lens was an emotion. Their team planned every detail like magic.",
    rating: 5,
  },
  {
    name: "Ananya Sharma",
    location: "Tosh, Parvati Valley",
    image:
      "https://dwq3yv87q1b43.cloudfront.net/public/blogs/fit-in/1200x675/Blog_20250508-1180596498-1746683961.jpg", // ✅ Tosh
    avatar: "https://randomuser.me/api/portraits/women/72.jpg",
    review:
      "Tosh was a revelation — the Himalayas, the people, the vibe. WeWravel created the perfect mix of comfort and raw mountain adventure. I came back changed.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    location: "Udaipur, Rajasthan",
    image:
      "https://s7ap1.scene7.com/is/image/incredibleindia/lake-pichola-udaipur-rajasthan-2-attr-hero?qlt=82&ts=1742161994371", // ✅ Udaipur
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    review:
      "From boat rides on Lake Pichola to exploring royal palaces — Udaipur was pure poetry. WeWravel captured every essence of luxury and heritage travel beautifully.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[current];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white flex items-center justify-center">
      {/* 🎬 Background Image */}
      <AnimatePresence mode="wait">
        <motion.img
          key={testimonial.image}
          src={testimonial.image}
          alt={testimonial.name}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.6] scale-105"
        />
      </AnimatePresence>

      {/* ✨ Glossy Golden Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute top-0 left-0 w-[60vw] h-[60vh] bg-yellow-400/10 blur-[120px] rounded-full"></div>

      {/* Floating golden dust particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute bg-yellow-400/20 rounded-full blur-[2px]"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.9, 0.3],
            }}
            transition={{
              duration: Math.random() * 6 + 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 🌟 Testimonial Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={testimonial.name}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="relative z-10 max-w-3xl mx-auto text-center px-8"
        >
          <motion.img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-28 h-28 mx-auto rounded-full border-2 border-yellow-400 shadow-[0_0_40px_rgba(255,221,0,0.5)] mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          />

          <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-2">
            {testimonial.name}
          </h3>
          <p className="text-gray-400 mb-4">{testimonial.location}</p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-200 leading-relaxed italic mb-6 font-light"
          >
            “{testimonial.review}”
          </motion.p>

          <div className="flex justify-center gap-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star
                key={i}
                className="w-6 h-6 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_6px_rgba(255,221,0,0.8)]"
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 🟡 Navigation Dots */}
      <div className="absolute bottom-10 flex gap-3">
        {testimonials.map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              current === index
                ? "bg-yellow-400 shadow-[0_0_12px_rgba(255,221,0,0.8)] scale-110"
                : "bg-gray-500 hover:bg-yellow-300/60"
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
