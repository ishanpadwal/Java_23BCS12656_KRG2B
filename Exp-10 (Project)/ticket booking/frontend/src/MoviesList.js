import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function MoviesList({ onSelect }) {
  const [movies, setMovies] = useState([]);
  const [q, setQ] = useState("");

  // Movie posters mapping
  const moviePosters = {
    "Spider-Man: Home": "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UX1000_.jpg",
    "The Conjuring: Last Rites": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR985s9rDX8fwiVvjCCQ0VcExBXoZWmCEL16ipk7wwYzGDq67pWdDsjWLV8jMpEVRBYOJTCZ24N-12ZLOfqI9ELzSaE14oTb7q0CCW-64mJ&s=10",
    "Comedy Night":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfJyVwLy7nWlcy79lWrtKyt4uDNI7ee0gGDfk5hV8g8BEXifsL4syj7jUqnD-xLN84GPBuEnvq2vxDqYOJu8xPLIRpvvbqIooe9w9U7klNQg&s=10",
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const res = await axios.get("http://localhost:8080/movies/all");
      setMovies(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching movies!");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!q) return fetchAll();
    try {
      const res = await axios.get(
        `http://localhost:8080/movies/search?q=${encodeURIComponent(q)}`
      );
      setMovies(res.data);
    } catch (err) {
      console.error(err);
      alert("Error searching movies!");
    }
  };

  const handleReset = () => {
    setQ("");
    fetchAll();
  };

  const getPoster = (title) => {
    return moviePosters[title] || null;
  };

  return (
    <div className="movies-page">
      <h2>Available Movies</h2>
      
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search by title, genre, or location"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>

      <div className="movies-grid">
        {movies.length > 0 ? (
          movies.map((m) => (
            <div key={m.id} className="movie-card">
              <div className="movie-poster">
                {getPoster(m.title) ? (
                  <img src={getPoster(m.title)} alt={m.title} />
                ) : (
                  <span className="poster-icon">🎬</span>
                )}
              </div>
              <div className="movie-info">
                <h3>{m.title}</h3>
                <p><strong>Genre:</strong> {m.genre}</p>
                <p><strong>Location:</strong> {m.location}</p>
                <p className="movie-desc">{m.description}</p>
                <button className="view-btn" onClick={() => onSelect(m.id)}>
                  View Showtimes
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-movies">No movies found!</p>
        )}
      </div>
    </div>
  );
}

export default MoviesList;