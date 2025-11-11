package com.ticketbooking.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import com.ticketbooking.backend.model.Movie;

public interface MovieRepository extends JpaRepository<Movie, Integer> {
    List<Movie> findByTitleContainingIgnoreCaseOrGenreContainingIgnoreCaseOrLocationContainingIgnoreCase(
        String title, String genre, String location);
}
