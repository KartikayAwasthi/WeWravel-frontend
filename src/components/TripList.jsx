import React, { useEffect, useMemo, useState } from "react";
import { getAllTrips } from "../api/tripService";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Clock, Search } from "lucide-react";

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllTrips()
      .then(setTrips)
      .catch(console.error);
  }, []);

  // ✅ Use useMemo to avoid re-filtering unnecessarily
  const filteredTrips = useMemo(() => {
    const lower = searchTerm.toLowerCase();
    if (!lower) return trips;
    return trips.filter(
      (trip) =>
        trip.title.toLowerCase().includes(lower) ||
        trip.location?.toLowerCase().includes(lower)
    );
  }, [searchTerm, trips]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-6">
      {/* Section Header */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold text-yellow-400 mb-4 drop-shadow-[0_0_20px_rgba(255,221,0,0.5)]"
        >
          Discover Your Next Adventure
        </motion.h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Handpicked destinations crafted for explorers, dreamers, and thrill seekers.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-lg mx-auto mb-14 relative">
        <Search size={20} className="absolute left-4 top-3.5 text-yellow-400" />
        <input
          type="text"
          placeholder="Search by destination or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-black/40 border border-yellow-400/30 rounded-full py-3 pl-12 pr-4 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 outline-none transition-all duration-300"
        />
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTrips.map((trip, index) => (
          <motion.div
            key={trip.id}
            // ⚡ Animate only on mount, not on every filter
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="relative rounded-3xl overflow-hidden shadow-xl group border border-yellow-400/20 bg-gradient-to-br from-gray-900/70 to-black/60 hover:shadow-[0_0_25px_rgba(255,221,0,0.25)] transition-all duration-300"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={trip.imageUrl || "/images/default.jpg"}
                alt={trip.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              <div className="absolute bottom-4 left-5 right-5">
                <h2 className="text-2xl font-bold text-yellow-300 drop-shadow-md">
                  {trip.title}
                </h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 text-gray-300 flex flex-col justify-between h-60">
              <div>
                <div className="flex items-center gap-3 text-gray-400 mb-1">
                  <MapPin size={18} className="text-yellow-400" />
                  <span>{trip.location || "Unknown Location"}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400 mb-4">
                  <Clock size={18} className="text-yellow-400" />
                  <span>{trip.duration}</span>
                </div>

                <p className="text-gray-400 line-clamp-3">{trip.description}</p>
              </div>

              <Link
                to={`/trip/${trip.id}`}
                className="inline-block mt-5 bg-yellow-400 text-black font-semibold py-2.5 rounded-full text-center hover:bg-yellow-500 hover:shadow-[0_0_20px_rgba(255,221,0,0.6)] transition-all duration-300"
              >
                View Details →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty */}
      {filteredTrips.length === 0 && (
        <p className="text-center text-gray-500 mt-16 text-lg">
          No matching trips found.
        </p>
      )}
    </div>
  );
};

export default TripList;
