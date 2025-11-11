import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function Showtimes({ movieId, onBack, onSelectShowtime }) {
  const [showtimes, setShowtimes] = useState([]);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;
    
    setLoading(true);
    
    Promise.all([
      axios.get(`http://localhost:8080/movies/${movieId}/showtimes`),
      axios.get(`http://localhost:8080/movies/${movieId}`)
    ])
      .then(([showtimesRes, movieRes]) => {
        setShowtimes(showtimesRes.data);
        setMovie(movieRes.data);
      })
      .catch(err => {
        console.error(err);
        alert("Error fetching showtimes!");
      })
      .finally(() => setLoading(false));
  }, [movieId]);

  if (!movieId) return null;

  return (
    <div className="showtimes-page">
      <button className="back-btn" onClick={onBack}>← Back to Movies</button>
      
      <h2>Showtimes for: {movie ? movie.title : "Loading..."}</h2>

      {loading ? (
        <p className="loading-text">Loading showtimes...</p>
      ) : (
        <div className="showtime-list">
          {showtimes.length === 0 ? (
            <p className="no-showtimes">No showtimes available for this movie.</p>
          ) : (
            showtimes.map((s) => (
              <div key={s.id} className="showtime-card">
                <p><strong>Date:</strong> {s.showDate}</p>
                <p><strong>Time:</strong> {s.showTime}</p>
                <p><strong>Total Seats:</strong> {s.totalSeats}</p>
                <button 
                  className="select-seats-btn" 
                  onClick={() => onSelectShowtime(s)}
                >
                  Select Seats
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Showtimes;