import React from "react";
import { motion } from "framer-motion";
import { Compass, MapPin, Users, Globe2 } from "lucide-react";

const AboutUs = () => {
  const timeline = [
    {
      year: "2016",
      title: "Where It All Began",
      desc: "WeWravel was born from a simple idea — to turn travel into a story worth telling. What started with weekend treks became a community of passionate explorers.",
    },
    {
      year: "2019",
      title: "Expanding Horizons",
      desc: "From the Himalayas to the beaches of South India, we curated journeys that blended thrill, culture, and connection — expanding across 50+ destinations.",
    },
    {
      year: "2022",
      title: "Global Footprints",
      desc: "We stepped beyond borders — connecting travelers across continents, from the Alps to the Andes, spreading stories of adventure and belonging.",
    },
    {
      year: "2025",
      title: "Future of Travel",
      desc: "Today, WeWravel fuses AI with emotion — crafting journeys powered by technology and inspired by human wanderlust.",
    },
  ];

  return (
    <div className="min-h-screen relative text-gray-300 overflow-hidden">
      {/* 🌅 Scenic Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80"
          alt="Mountains and adventure"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-[#1a1a1a]/90" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* 🏔️ Hero Section */}
        <section className="text-center py-28 px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-[0_0_30px_rgba(255,221,0,0.4)]"
          >
            Discover <span className="text-yellow-400">Our Story</span> 🌍
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl mx-auto text-gray-300 text-lg leading-relaxed"
          >
            At <span className="text-yellow-400 font-semibold">WeWravel</span>,
            we don’t just plan trips — we craft memories. From mountain peaks to
            sandy shores, we believe every journey should feel alive, authentic,
            and unforgettable.
          </motion.p>
        </section>

        {/* 🧭 About Section */}
        <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6 py-16">
          <motion.img
            src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80"
            alt="Adventure Travel"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl shadow-[0_0_40px_rgba(255,221,0,0.2)] object-cover h-[450px] w-full"
          />

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              Who We Are ✨
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              WeWravel is a collective of explorers, dreamers, and creators
              redefining what travel means. Our purpose is simple — to make
              exploration seamless, soulful, and sustainable.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Whether you’re chasing sunsets, scaling peaks, or wandering
              through ancient streets — we design experiences that stay with
              you, long after the journey ends.
            </p>
          </motion.div>
        </section>

        {/* 🌄 Horizontal Timeline */}
        <section className="relative py-24 px-8 overflow-x-auto scrollbar-hide">
          <h2 className="text-3xl font-bold text-center text-yellow-400 mb-12">
            Our Journey Through Time
          </h2>

          <div className="flex items-center justify-start space-x-16 md:space-x-24 w-max mx-auto relative">
            {/* Connecting Line */}
            <div className="absolute top-[52%] left-0 w-full h-[3px] bg-gradient-to-r from-yellow-400/10 via-yellow-400/50 to-yellow-400/10 rounded-full"></div>

            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative flex flex-col items-center w-[240px] text-center"
              >
                <div className="w-20 h-20 rounded-full bg-black border-4 border-yellow-400 flex items-center justify-center text-yellow-400 font-bold text-lg shadow-[0_0_25px_rgba(255,221,0,0.7)] z-10">
                  {item.year}
                </div>
                <div className="mt-6 bg-black/60 border border-yellow-400/20 backdrop-blur-lg p-6 rounded-2xl shadow-[0_0_30px_rgba(255,221,0,0.1)] hover:shadow-[0_0_35px_rgba(255,221,0,0.3)] transition-all duration-300">
                  <h3 className="text-white text-lg font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 🌍 Values Section */}
        <section className="bg-white/5 border-y border-yellow-400/10 py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-yellow-400 mb-12">
              What We Believe In 🌄
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {[
                {
                  icon: <Compass className="w-10 h-10 mx-auto text-yellow-400" />,
                  title: "Adventure",
                  desc: "Every journey is a story waiting to be lived.",
                },
                {
                  icon: <Globe2 className="w-10 h-10 mx-auto text-yellow-400" />,
                  title: "Sustainability",
                  desc: "We travel with care — for the planet and its people.",
                },
                {
                  icon: <Users className="w-10 h-10 mx-auto text-yellow-400" />,
                  title: "Community",
                  desc: "We bring travelers together as one family.",
                },
                {
                  icon: <MapPin className="w-10 h-10 mx-auto text-yellow-400" />,
                  title: "Authenticity",
                  desc: "Real moments, real places, real experiences.",
                },
              ].map((value, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(255,221,0,0.4)",
                  }}
                  className="p-6 rounded-2xl bg-black/50 border border-yellow-400/20 backdrop-blur-md transition-all duration-300"
                >
                  {value.icon}
                  <h3 className="text-white text-xl font-semibold mt-3 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        
        
      </div>
    </div>
  );
};

export default AboutUs;
