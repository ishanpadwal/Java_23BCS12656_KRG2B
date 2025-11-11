package com.ticketbooking.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.ticketbooking.backend.model.Movie;
import com.ticketbooking.backend.model.Showtime;
import com.ticketbooking.backend.repository.MovieRepository;
import com.ticketbooking.backend.repository.ShowtimeRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/movies")
public class MovieController {

    @Autowired
    private MovieRepository movieRepo;

    @Autowired
    private ShowtimeRepository showtimeRepo;

    @GetMapping("/all")
    public List<Movie> getAll() {
        return movieRepo.findAll();
    }

    @GetMapping("/search")
    public List<Movie> search(@RequestParam("q") String q) {
        return movieRepo.findByTitleContainingIgnoreCaseOrGenreContainingIgnoreCaseOrLocationContainingIgnoreCase(q, q, q);
    }

    @GetMapping("/{id}")
    public Movie getById(@PathVariable Integer id) {
        return movieRepo.findById(id).orElse(null);
    }

    @GetMapping("/{id}/showtimes")
    public List<Showtime> getShowtimes(@PathVariable Integer id) {
        return showtimeRepo.findByMovieId(id);
    }
}
