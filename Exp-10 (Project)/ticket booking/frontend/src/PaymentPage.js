import React, { useState } from "react";
import "./App.css";

function PaymentPage({ amount, onPaymentSuccess, onCancel }) {
  const [method, setMethod] = useState("card");
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("💳 Payment Successful!");
      onPaymentSuccess(); // back to booking confirmation
    }, 2000); // simulate 2s delay
  };

  return (
    <div className="payment-container">
      <button className="back-btn" onClick={onCancel}>← Back</button>
      <h2>💰 Payment Page</h2>
      <p>Total Amount: <b>₹{amount}</b></p>

      <div className="method-section">
        <label>
          <input
            type="radio"
            value="card"
            checked={method === "card"}
            onChange={() => setMethod("card")}
          />
          Credit/Debit Card
        </label>

        <label>
          <input
            type="radio"
            value="upi"
            checked={method === "upi"}
            onChange={() => setMethod("upi")}
          />
          UPI
        </label>
      </div>

      {method === "card" && (
        <div className="card-form">
          <input placeholder="Card Number" maxLength="16" />
          <input placeholder="Expiry (MM/YY)" />
          <input placeholder="CVV" maxLength="3" type="password" />
        </div>
      )}

      {method === "upi" && (
        <div className="upi-form">
          <input placeholder="Enter UPI ID" />
        </div>
      )}

      <button className="pay-btn" onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}

export default PaymentPage;
