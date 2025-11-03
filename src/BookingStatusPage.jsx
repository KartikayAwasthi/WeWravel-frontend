import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BookingStatusPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const booking = state?.booking;
  const paymentSuccess = state?.paymentSuccess;

  if (!booking) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-400 text-xl">
        No booking details found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-900/80 border border-yellow-400/30 p-8 rounded-2xl max-w-2xl w-full text-center shadow-[0_0_40px_rgba(255,221,0,0.2)]"
      >
        <h1 className="text-4xl font-extrabold text-yellow-400 mb-6">
          {paymentSuccess ? "🎉 Booking Confirmed!" : "⚠️ Payment Pending"}
        </h1>

        <div className="space-y-3 text-left text-gray-300">
          <p><span className="font-semibold text-yellow-400">Trip:</span> {booking.tripTitle}</p>
          <p><span className="font-semibold text-yellow-400">Name:</span> {booking.userName}</p>
          <p><span className="font-semibold text-yellow-400">Email:</span> {booking.userEmail}</p>
          <p><span className="font-semibold text-yellow-400">Mobile:</span> {booking.userMobile}</p>
          <p><span className="font-semibold text-yellow-400">Room Type:</span> {booking.roomType}</p>
          <p><span className="font-semibold text-yellow-400">Travelers:</span> {booking.travelers}</p>
          <p><span className="font-semibold text-yellow-400">Total Cost:</span> ₹{booking.totalCost}</p>
          <p><span className="font-semibold text-yellow-400">Paid Amount:</span> ₹{booking.paidAmount || 0}</p>
          <p>
            <span className="font-semibold text-yellow-400">Payment Status:</span>{" "}
            <span
              className={`${
                booking.paymentStatus === "PAID"
                  ? "text-green-400"
                  : "text-red-400"
              } font-bold`}
            >
              {booking.paymentStatus}
            </span>
          </p>
        </div>

        {!paymentSuccess && (
          <p className="text-yellow-300 mt-6 text-lg">
            💬 For any query, talk with{" "}
            <span className="font-bold text-yellow-400">7355570155</span>
          </p>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="mt-8 bg-yellow-400 text-black font-bold py-3 px-6 rounded-full shadow-[0_0_25px_rgba(255,221,0,0.6)] hover:shadow-[0_0_40px_rgba(255,221,0,1)] transition-all duration-300"
        >
          Back to Home →
        </motion.button>
      </motion.div>
    </div>
  );
};

export default BookingStatusPage;
