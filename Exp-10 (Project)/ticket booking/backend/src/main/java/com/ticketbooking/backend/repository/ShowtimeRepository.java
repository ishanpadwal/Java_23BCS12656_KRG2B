package com.ticketbooking.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.ticketbooking.backend.model.Showtime;

public interface ShowtimeRepository extends JpaRepository<Showtime, Integer> {
    List<Showtime> findByMovieId(Integer movieId);
}
