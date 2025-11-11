import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import MoviesList from "./MoviesList";
import Showtimes from "./Showtimes";
import SeatSelection from "./SeatSelection";
import BookingHistory from "./BookingHistory";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setSelectedMovieId(null);
    setSelectedShowtime(null);
    setShowHistory(false);
  };

  const handleBackToShowtimes = () => {
    setSelectedShowtime(null);
  };

  const handleBackToMovies = () => {
    setSelectedMovieId(null);
    setSelectedShowtime(null);
  };

  const handleBackFromHistory = () => {
    setShowHistory(false);
  };

  // Login/Register screen
  if (!loggedIn) {
    return (
      <div className="app">
        {!showRegister ? (
          <Login 
            onLoginSuccess={handleLoginSuccess} 
            onSwitch={() => setShowRegister(true)} 
          />
        ) : (
          <Register onSwitch={() => setShowRegister(false)} />
        )}
      </div>
    );
  }

  // After login → Movies Page → Showtimes → Seat Selection OR Booking History
  return (
    <div className="app">
      <header className="app-header">
        <h1>🎬 Ticket Booking</h1>
        <div>
          <button 
            className="history-btn" 
            onClick={() => setShowHistory(true)}
            style={{ marginRight: '10px' }}
          >
            My Bookings
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {showHistory ? (
        <BookingHistory userId={1} onBack={handleBackFromHistory} />
      ) : !selectedMovieId ? (
        <MoviesList onSelect={(id) => setSelectedMovieId(id)} />
      ) : !selectedShowtime ? (
        <Showtimes
          movieId={selectedMovieId}
          onBack={handleBackToMovies}
          onSelectShowtime={(showtime) => setSelectedShowtime(showtime)}
        />
      ) : (
        <SeatSelection
          showtime={selectedShowtime}
          onBack={handleBackToShowtimes}
        />
      )}
    </div>
  );
}

export default App;
