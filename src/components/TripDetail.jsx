import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTripById } from "../api/tripService";
import { motion } from "framer-motion";
import { MapPin, Clock, Wallet, CheckCircle2, XCircle } from "lucide-react";

const TripDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    getTripById(id)
      .then(setTrip)
      .catch(console.error);
  }, [id]);

  // ✅ Handle Booking Navigation
  const handleBooking = () => {
    navigate(`/booking/${id}`, { state: { trip } });
  };

  if (!trip)
    return (
      <div className="flex justify-center items-center h-screen text-yellow-400 text-xl font-semibold">
        Loading trip details...
      </div>
    );

  return (
    <div className="w-screen min-h-screen bg-black text-white overflow-hidden">
      {/* ========= HERO SECTION ========= */}
      <div className="relative w-full h-[65vh] overflow-hidden">
        <motion.img
          src={trip.imageUrl || "/images/default.jpg"}
          alt={trip.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl font-extrabold text-yellow-400 drop-shadow-[0_0_35px_rgba(255,221,0,0.4)]"
          >
            {trip.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-3 flex items-center gap-2 text-lg text-gray-300"
          >
            <MapPin size={22} className="text-yellow-400" />
            {trip.location || "Unknown Location"}
          </motion.p>
        </div>
      </div>

      {/* ========= DETAILS GRID ========= */}
      <section className="w-full grid lg:grid-cols-2 gap-0">
        {/* LEFT SIDE – OVERVIEW */}
        <div className="relative bg-gradient-to-br from-black via-gray-900 to-black p-10 flex flex-col justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/5 via-transparent to-black/80 pointer-events-none"></div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 space-y-8"
          >
            {/* Description */}
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              {trip.description}
            </p>

            {/* Info Grid */}
            <div className="grid grid-cols-3 gap-5 text-center">
              <div className="bg-black/50 border border-yellow-400/20 rounded-xl p-4">
                <Clock className="mx-auto text-yellow-400 mb-2" size={28} />
                <p className="text-sm text-gray-400">Duration</p>
                <p className="text-yellow-300 font-medium">{trip.duration}</p>
              </div>
              <div className="bg-black/50 border border-yellow-400/20 rounded-xl p-4">
                <Wallet className="mx-auto text-yellow-400 mb-2" size={28} />
                <p className="text-sm text-gray-400">Starting Price</p>
                <p className="text-yellow-300 font-medium">
                  ₹{trip.pricing?.[0]?.price || "N/A"}
                </p>
              </div>
              <div className="bg-black/50 border border-yellow-400/20 rounded-xl p-4">
                <CheckCircle2 className="mx-auto text-yellow-400 mb-2" size={28} />
                <p className="text-sm text-gray-400">Days</p>
                <p className="text-yellow-300 font-medium">
                  {trip.itinerary?.length || 0}
                </p>
              </div>
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBooking}
              className="mt-8 bg-yellow-400 text-black font-semibold px-10 py-3 rounded-full text-lg shadow-[0_0_25px_rgba(255,221,0,0.6)] hover:shadow-[0_0_40px_rgba(255,221,0,1)] transition-all duration-300"
            >
              Book This Trip →
            </motion.button>
          </motion.div>
        </div>

        {/* RIGHT SIDE – DETAILS CARDS */}
        <div className="bg-black flex flex-col justify-center p-10 space-y-6 border-l border-yellow-400/10">
          {/* Itinerary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-950/60 border border-yellow-400/20 rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-yellow-400 mb-3">🗓️ Itinerary</h2>
            <ul className="text-gray-300 space-y-2 text-sm max-h-[180px] overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-400/30">
              {trip.itinerary?.map((day, i) => (
                <li key={i}>
                  <span className="text-yellow-300 font-semibold">
                    Day {day.dayNumber}:
                  </span>{" "}
                  {day.title} — {day.description}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Pricing */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gray-950/60 border border-yellow-400/20 rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-yellow-400 mb-3">💰 Pricing</h2>
            <table className="w-full text-sm text-gray-300">
              <thead className="text-yellow-400/80">
                <tr>
                  <th className="pb-2">Room Type</th>
                  <th className="pb-2">Price (₹)</th>
                </tr>
              </thead>
              <tbody>
                {trip.pricing?.map((p, i) => (
                  <tr key={i} className="border-t border-yellow-400/10">
                    <td className="py-2">{p.roomType}</td>
                    <td className="py-2">₹{p.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Inclusions & Exclusions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-gray-950/60 border border-yellow-400/20 rounded-xl p-5">
              <h3 className="text-xl font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                <CheckCircle2 className="text-green-400" /> Inclusions
              </h3>
              <ul className="text-sm text-gray-300 list-disc ml-4 space-y-1 max-h-[110px] overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-400/30">
                {trip.inclusions?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-950/60 border border-yellow-400/20 rounded-xl p-5">
              <h3 className="text-xl font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                <XCircle className="text-red-400" /> Exclusions
              </h3>
              <ul className="text-sm text-gray-300 list-disc ml-4 space-y-1 max-h-[110px] overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-400/30">
                {trip.exclusions?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full text-center text-gray-500 text-sm py-5 border-t border-yellow-400/10">
        © {new Date().getFullYear()} WeWravel Experiences | Crafted by Kartik Awasthi
      </footer>
    </div>
  );
};

export default TripDetail;
