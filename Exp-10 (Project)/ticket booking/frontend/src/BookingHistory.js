import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function BookingHistory({ userId, onBack }) {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const res = await axios.get(`http://localhost:8080/bookings/user/${userId}`);
    setBookings(res.data);
  };

  const cancelBooking = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      await axios.delete(`http://localhost:8080/bookings/${id}`);
      alert("Booking Cancelled!");
      fetchBookings();
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="history-container">
      <button onClick={onBack} className="back-btn">← Back</button>
      <h2>🎟️ My Booking History</h2>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="booking-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Showtime ID</th>
              <th>Seats</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.showtimeId}</td>
                <td>{b.seatNumbers}</td>
                <td>₹{b.totalAmount}</td>
                <td>{b.bookingTime?.replace("T", " ").slice(0, 19)}</td>
                <td>
                  <button
                    className="cancel-btn"
                    onClick={() => cancelBooking(b.id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BookingHistory;
