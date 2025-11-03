import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const BookingPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const trip = state?.trip;

  const [user, setUser] = useState({ name: "", email: "", mobile: "" });
  const [formData, setFormData] = useState({
    roomType: "",
    travelers: 1,
    specialRequest: "",
    startDate: "", // 🗓 added
  });

  const [totalCost, setTotalCost] = useState(0);
  const [bookingAmount, setBookingAmount] = useState(0);

  // ✅ Fetch logged-in user details
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      alert("Please log in to continue booking.");
      navigate("/login");
    }
  }, [navigate]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Auto calculate total cost & booking amount
  useEffect(() => {
    if (trip && formData.roomType) {
      const selectedRoom = trip.pricing?.find(
        (p) => p.roomType === formData.roomType
      );
      if (selectedRoom) {
        const total = selectedRoom.price * formData.travelers;
        setTotalCost(total);
        setBookingAmount((total * 0.3).toFixed(2)); // 30%
      }
    } else {
      setTotalCost(0);
      setBookingAmount(0);
    }
  }, [formData.roomType, formData.travelers, trip]);

  // ✅ Submit booking
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.roomType) {
      alert("Please select a room type before confirming booking.");
      return;
    }

    if (!formData.startDate) {
      alert("Please select your preferred trip start date.");
      return;
    }

    const bookingData = {
      tripId: id,
      tripTitle: trip.title,
      userName: user.name,
      userEmail: user.email,
      userMobile: user.mobile,
      roomType: formData.roomType,
      travelers: formData.travelers,
      totalCost: totalCost,
      bookingAmount: bookingAmount,
      specialRequest: formData.specialRequest || "",
      startDate: formData.startDate, // 🗓 user-selected
    };

    try {
      const bookingResponse = await fetch("http://localhost:8080/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const result = await bookingResponse.json();

      if (result.error) {
        alert("❌ Failed to create booking or payment order.");
        return;
      }

      const { booking, razorpayOrderId, razorpayKey, amount } = result;

      // 2️⃣ Razorpay checkout
      const options = {
        key: razorpayKey,
        amount: amount,
        currency: "INR",
        name: "WeWravel Experiences",
        description: `Booking for ${trip.title}`,
        image: "/logo.png",
        order_id: razorpayOrderId,
        handler: async function (response) {
          const paymentUpdate = {
            paymentStatus: "PAID",
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            paidAmount: totalCost,
          };

          const updateResponse = await fetch(
            `http://localhost:8080/api/bookings/${booking.id}/update-payment`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(paymentUpdate),
            }
          );

          const updatedBooking = await updateResponse.json();

          navigate("/booking-status", {
            state: { booking: updatedBooking, paymentSuccess: true },
          });
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.mobile,
        },
        theme: { color: "#facc15" },
        modal: {
          ondismiss: function () {
            navigate("/booking-status", {
              state: { booking: booking, paymentSuccess: false },
            });
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("💥 Booking or payment error:", error);
      alert("Something went wrong while processing your booking.");
    }
  };

  if (!trip)
    return (
      <div className="flex justify-center items-center h-screen text-yellow-400 text-xl font-semibold">
        Loading trip details...
      </div>
    );

  // 🗓 Helper: disable past dates
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-16 px-6">
      {/* ==== HEADER ==== */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-10 drop-shadow-[0_0_25px_rgba(255,221,0,0.4)] text-center"
      >
        Book Your Trip
      </motion.h1>

      {/* ==== TRIP SUMMARY ==== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-900/70 p-6 rounded-xl border border-yellow-400/20 max-w-2xl w-full mb-10 shadow-lg"
      >
        <div className="flex flex-col md:flex-row items-center gap-5">
          <img
            src={trip?.imageUrl || "/images/default.jpg"}
            alt={trip?.title}
            className="w-full md:w-1/3 rounded-lg object-cover shadow-md"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-yellow-400">{trip.title}</h2>
            <p className="text-gray-400 mt-1">{trip.location}</p>
            <p className="text-gray-300 mt-2">
              <span className="text-yellow-400 font-medium">Duration:</span>{" "}
              {trip.duration}
            </p>
            <p className="text-gray-300">
              <span className="text-yellow-400 font-medium">Starting Price:</span>{" "}
              ₹{trip.pricing?.[0]?.price}
            </p>
          </div>
        </div>
      </motion.div>

      {/* ==== BOOKING FORM ==== */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-900/80 p-8 rounded-2xl border border-yellow-400/20 max-w-2xl w-full space-y-6 shadow-xl"
      >
        <h3 className="text-2xl font-semibold text-yellow-400 mb-4">
          Traveler Details
        </h3>

        {/* ==== User Info ==== */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 mb-1">Full Name</label>
            <input
              type="text"
              value={user.name}
              readOnly
              className="w-full bg-black border border-yellow-400/30 rounded-lg p-2 text-gray-200"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Email</label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full bg-black border border-yellow-400/30 rounded-lg p-2 text-gray-200"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Mobile Number</label>
            <input
              type="text"
              value={user.mobile || user.phone || user.contactNumber || ""}
              readOnly
              className="w-full bg-black border border-yellow-400/30 rounded-lg p-2 text-gray-200"
            />
          </div>

          {/* ==== Room Type ==== */}
          <div>
            <label className="block text-gray-400 mb-1">Room Type</label>
            <select
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              required
              className="w-full bg-black border border-yellow-400/30 rounded-lg p-2 text-gray-200 focus:outline-none focus:border-yellow-400"
            >
              <option value="">Select Room Type</option>
              {trip.pricing?.map((p, i) => (
                <option key={i} value={p.roomType}>
                  {p.roomType} — ₹{p.price}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ==== START DATE PICKER ==== */}
        <div>
          <label className="block text-gray-400 mb-1">Trip Start Date</label>
          <input
            type="date"
            name="startDate"
            min={today}
            value={formData.startDate}
            onChange={handleChange}
            required
            className="w-full bg-black border border-yellow-400/30 rounded-lg p-2 text-gray-200 focus:outline-none focus:border-yellow-400"
          />
          <p className="text-xs text-gray-500 mt-1">
            *Trips usually start on Friday or Saturday nights. Choose your preferred date.
          </p>
        </div>

        {/* ==== Travelers ==== */}
        <div>
          <label className="block text-gray-400 mb-1">Number of Travelers</label>
          <input
            type="number"
            name="travelers"
            value={formData.travelers}
            onChange={handleChange}
            min="1"
            max="10"
            className="w-full bg-black border border-yellow-400/30 rounded-lg p-2 text-gray-200 focus:outline-none focus:border-yellow-400"
          />
        </div>

        {/* ==== Special Request ==== */}
        <div>
          <label className="block text-gray-400 mb-1">Special Requests</label>
          <textarea
            name="specialRequest"
            value={formData.specialRequest}
            onChange={handleChange}
            placeholder="Any special requirements or preferences?"
            rows="3"
            className="w-full bg-black border border-yellow-400/30 rounded-lg p-2 text-gray-200 focus:outline-none focus:border-yellow-400"
          ></textarea>
        </div>

        {/* ==== PRICE CALCULATOR ==== */}
        {totalCost > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-6 text-center shadow-[0_0_25px_rgba(255,221,0,0.2)]"
          >
            <h4 className="text-2xl font-bold text-yellow-400 mb-2">
              💰 Booking Summary
            </h4>
            <p className="text-gray-300 text-lg">
              <span className="font-semibold text-yellow-300">Total Trip Cost:</span>{" "}
              ₹{totalCost.toLocaleString()}
            </p>
            <p className="text-gray-300 text-lg mt-2">
              <span className="font-semibold text-yellow-300">Booking Amount (30%):</span>{" "}
              ₹{bookingAmount.toLocaleString()}
            </p>
          </motion.div>
        )}

        {/* ==== Confirm Button ==== */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full mt-6 bg-yellow-400 text-black font-bold py-3 rounded-full text-lg shadow-[0_0_25px_rgba(255,221,0,0.6)] hover:shadow-[0_0_40px_rgba(255,221,0,1)] transition-all duration-300"
        >
          Confirm Booking →
        </motion.button>
      </motion.form>
    </div>
  );
};

export default BookingPage;
