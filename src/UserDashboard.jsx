import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  LogOut,
  Compass,
  CalendarDays,
  IndianRupee,
} from "lucide-react";
import { getAllTrips } from "./api/tripService.js";
import { getBookingsByUserId } from "./api/bookingService.js";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Fetch all bookings for this user
      getBookingsByUserId(parsedUser.id)
        .then(setBookings)
        .catch((err) => console.error("Error fetching bookings:", err));
    } else {
      window.location.href = "/login";
    }

    getAllTrips()
      .then(setTrips)
      .catch((err) => console.error("Error fetching trips:", err));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen text-yellow-400 text-xl font-semibold">
        Loading dashboard...
      </div>
    );

  // 🧭 Separate upcoming & previous bookings based on startDate
  const currentDate = new Date();
  const upcomingBookings = bookings.filter(
    (b) => new Date(b.startDate) > currentDate
  );
  const pastBookings = bookings.filter(
    (b) => new Date(b.startDate) <= currentDate
  );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row pt-20">
      {/* ===== LEFT SIDEBAR ===== */}
      <motion.aside
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="lg:w-1/4 w-full bg-gradient-to-b from-gray-900 via-gray-950 to-black border-r border-yellow-400/20 p-6 flex flex-col justify-between lg:sticky lg:top-20 h-auto lg:h-[calc(100vh-5rem)] overflow-y-auto"
      >
        <div>
          {/* ==== USER CARD ==== */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative mb-5">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 blur-md opacity-75 animate-pulse"></div>
              <motion.img
                src={
                  user.imageUrl ||
                  "https://cdn-icons-png.flaticon.com/512/5556/5556468.png"
                }
                alt="User Avatar"
                className="relative w-28 h-28 rounded-full border-4 border-yellow-400 object-cover shadow-[0_0_25px_rgba(255,221,0,0.4)]"
              />
            </div>
            <h2 className="text-2xl font-semibold text-yellow-400 mb-1">
              {user.name || "Traveler"}
            </h2>
            <p className="text-gray-400 text-sm mb-4">Welcome back 🌍</p>

            {/* ==== USER DETAILS ==== */}
            <div className="space-y-3 text-gray-300 w-full">
              <div className="flex items-center gap-3 bg-black/50 p-3 rounded-lg border border-yellow-400/10">
                <Mail size={18} className="text-yellow-400" />
                <span className="text-sm truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 bg-black/50 p-3 rounded-lg border border-yellow-400/10">
                <Phone size={18} className="text-yellow-400" />
                <span className="text-sm">{user.contactNumber}</span>
              </div>
              <div className="flex items-center gap-3 bg-black/50 p-3 rounded-lg border border-yellow-400/10">
                <MapPin size={18} className="text-yellow-400" />
                <span className="text-sm">
                  Member since{" "}
                  {user.createdAt
                    ? new Date(user.createdAt).getFullYear()
                    : "2025"}
                </span>
              </div>
            </div>
          </div>

          {/* ==== UPCOMING BOOKINGS ==== */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center gap-2">
              <CalendarDays size={18} /> Upcoming Trips
            </h3>
            {upcomingBookings.length > 0 ? (
              <div className="space-y-3">
                {upcomingBookings.map((b) => (
                  <motion.div
                    key={b.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-3 rounded-lg bg-black/40 border border-yellow-400/20 hover:border-yellow-400/40 transition cursor-pointer"
                    onClick={() => (window.location.href = `/trip/${b.tripId}`)}
                  >
                    <p className="text-yellow-300 font-medium">{b.tripTitle}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      {new Date(b.startDate).toDateString()} →{" "}
                      {new Date(b.endDate).toDateString()}
                    </p>
                    <p className="text-yellow-500 text-xs mt-1">
                      {b.duration || "3 Days / 2 Nights"}
                    </p>

                    {/* Payment Badge */}
                    <div className="flex items-center gap-1 text-xs mt-2">
                      <IndianRupee
                        size={14}
                        className={`${
                          b.paymentStatus === "PAID"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      />
                      <span
                        className={`font-semibold ${
                          b.paymentStatus === "PAID"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {b.paymentStatus === "PAID"
                          ? `Paid ₹${b.paidAmount}`
                          : "Payment Pending"}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm italic">
                No upcoming trips booked.
              </p>
            )}
          </div>

          {/* ==== PREVIOUS BOOKINGS ==== */}
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-3 flex items-center gap-2">
              <CalendarDays size={18} /> Previous Trips
            </h3>
            {pastBookings.length > 0 ? (
              <div className="space-y-3">
                {pastBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-3 rounded-lg bg-black/40 border border-yellow-400/20 hover:border-yellow-400/40 transition"
                  >
                    <p className="text-gray-300 font-medium">{b.tripTitle}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      {new Date(b.startDate).toDateString()} →{" "}
                      {new Date(b.endDate).toDateString()}
                    </p>
                    <p className="text-yellow-500 text-xs mt-1">
                      {b.duration || "3 Days / 2 Nights"}
                    </p>

                    <div className="flex items-center gap-1 text-xs mt-2">
                      <IndianRupee
                        size={14}
                        className={`${
                          b.paymentStatus === "PAID"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      />
                      <span
                        className={`font-semibold ${
                          b.paymentStatus === "PAID"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {b.paymentStatus === "PAID"
                          ? `Paid ₹${b.paidAmount}`
                          : "Payment Pending"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm italic">
                No previous trips found.
              </p>
            )}
          </div>
        </div>

        {/* ==== LOGOUT BUTTON ==== */}
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 bg-yellow-400 text-black font-semibold py-2 px-8 rounded-full text-sm shadow-[0_0_25px_rgba(255,221,0,0.5)] hover:shadow-[0_0_35px_rgba(255,221,0,1)] transition-all duration-300"
        >
          <LogOut size={16} className="inline mr-2" />
          Logout
        </motion.button>
      </motion.aside>

      {/* ===== RIGHT MAIN CONTENT ===== */}
      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 p-6 lg:p-10 overflow-y-auto"
      >
        <div className="flex flex-col lg:flex-row justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-yellow-400 flex items-center gap-3">
            <Compass /> Explore Our Top Destinations
          </h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-4 lg:mt-0 bg-yellow-400/10 border border-yellow-400/20 rounded-full px-6 py-2 text-yellow-300 font-medium"
          >
            Total Destinations:{" "}
            <span className="font-bold text-yellow-400">{trips.length}</span>
          </motion.div>
        </div>

        {/* ==== TRIP CARDS ==== */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-900/80 border border-yellow-400/20 rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,221,0,0.3)] transition-transform duration-300 cursor-pointer"
              onClick={() => (window.location.href = `/trip/${trip.id}`)}
            >
              <img
                src={trip.imageUrl}
                alt={trip.title}
                className="w-full h-52 object-cover"
              />
              <div className="p-5">
                <h4 className="text-xl font-semibold text-yellow-300 mb-1">
                  {trip.title}
                </h4>
                <p className="text-gray-400 text-sm">{trip.location}</p>
                <p className="text-yellow-400 text-sm mt-2">{trip.duration}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.main>
    </div>
  );
};

export default UserDashboard;
