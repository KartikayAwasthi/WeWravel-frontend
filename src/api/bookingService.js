// src/api/bookingService.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/bookings";

/**
 * ✅ Get all bookings of a specific user
 * @param {number} userId
 * @returns {Promise<Array>}
 */
export const getBookingsByUserId = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching user bookings:", error);
    throw error;
  }
};

/**
 * ✅ Create a new booking (used during payment initiation)
 * @param {Object} bookingData
 * @returns {Promise<Object>}
 */
export const createBooking = async (bookingData) => {
  try {
    const response = await axios.post(BASE_URL, bookingData);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating booking:", error);
    throw error;
  }
};

/**
 * ✅ Update booking payment details after successful payment
 * @param {number} bookingId
 * @param {Object} paymentData
 * @returns {Promise<Object>}
 */
export const updateBookingPayment = async (bookingId, paymentData) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/${bookingId}/update-payment`,
      paymentData
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error updating booking payment:", error);
    throw error;
  }
};
