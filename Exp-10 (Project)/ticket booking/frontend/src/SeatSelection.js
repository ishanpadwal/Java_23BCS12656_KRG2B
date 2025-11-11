import React, { useState, useEffect } from "react";
import axios from "axios";
import PaymentPage from "./PaymentPage";
import "./App.css";

function SeatSelection({ showtime, onBack }) {
  const seats = Array.from({ length: 30 }, (_, i) => `A${i + 1}`);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [showPayment, setShowPayment] = useState(false);

  // Fetch booked seats from backend
  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/bookings/showtime/${showtime.id}`);
        const booked = res.data.flatMap(b => b.seatNumbers.split(","));
        setBookedSeats(booked);
      } catch (err) {
        console.error("Error fetching booked seats:", err);
      }
    };
    fetchBookedSeats();
  }, [showtime.id]);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return; // Don't allow booked seats
    
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat!");
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = async () => {
    const booking = {
      userId: 1,
      showtimeId: showtime.id,
      seatNumbers: selectedSeats.join(","),
      totalAmount: selectedSeats.length * 200,
    };

    try {
      const res = await axios.post("http://localhost:8080/bookings/create", booking);
      alert(res.data);
      setSelectedSeats([]);
      setShowPayment(false);
      onBack();
    } catch (err) {
      console.error(err);
      alert("Booking failed! Check backend connection.");
    }
  };

  if (showPayment) {
    return (
      <PaymentPage
        amount={selectedSeats.length * 200}
        onPaymentSuccess={handlePaymentSuccess}
        onCancel={() => setShowPayment(false)}
      />
    );
  }

  return (
    <div className="seat-page">
      <button className="back-btn" onClick={onBack}>← Back to Showtimes</button>
      
      <h2>Select Your Seats</h2>
      <p className="showtime-info">
        <strong>Date:</strong> {showtime.showDate} | <strong>Time:</strong> {showtime.showTime}
      </p>

      <div className="screen">SCREEN</div>

      <div className="seat-grid">
        {seats.map((seat) => {
          const isBooked = bookedSeats.includes(seat);
          const isSelected = selectedSeats.includes(seat);
          
          return (
            <div
              key={seat}
              className={`seat ${isBooked ? "booked" : ""} ${isSelected ? "selected" : ""}`}
              onClick={() => toggleSeat(seat)}
              style={{ cursor: isBooked ? "not-allowed" : "pointer" }}
            >
              {seat}
            </div>
          );
        })}
      </div>

      <div className="seat-legend">
        <div className="legend-item">
          <div className="legend-box available"></div>
          <span>Available</span>
        </div>
        <div className="legend-item">
          <div className="legend-box selected"></div>
          <span>Selected</span>
        </div>
        <div className="legend-item">
          <div className="legend-box booked"></div>
          <span>Booked</span>
        </div>
      </div>

      <div className="booking-summary">
        <div className="summary-details">
          <p><strong>Selected Seats:</strong> {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}</p>
          <p className="total-price"><strong>Total Amount:</strong> ₹{selectedSeats.length * 200}</p>
        </div>
        <button 
          className="book-now-btn" 
          onClick={handleBooking}
          disabled={selectedSeats.length === 0}
        >
          Proceed to Payment ({selectedSeats.length} {selectedSeats.length === 1 ? "Seat" : "Seats"})
        </button>
      </div>
    </div>
  );
}

export default SeatSelection;
