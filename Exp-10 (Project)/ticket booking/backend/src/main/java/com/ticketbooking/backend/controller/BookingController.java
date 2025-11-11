package com.ticketbooking.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.ticketbooking.backend.model.Booking;
import com.ticketbooking.backend.repository.BookingRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/bookings")
public class BookingController {

    @Autowired
    private BookingRepository repo;

    @PostMapping("/create")
    public String createBooking(@RequestBody Booking booking) {
        repo.save(booking);
        return "Booking Successful!";
    }

    // Get all bookings for a specific user
    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUser(@PathVariable Integer userId) {
        return repo.findAll()
                .stream()
                .filter(b -> b.getUserId().equals(userId))
                .toList();
    }

    // Get all bookings for a specific showtime (NEW)
    @GetMapping("/showtime/{showtimeId}")
    public List<Booking> getBookingsByShowtime(@PathVariable Integer showtimeId) {
        return repo.findByShowtimeId(showtimeId);
    }

    // Cancel (delete) a booking
    @DeleteMapping("/{id}")
    public String cancelBooking(@PathVariable Integer id) {
        repo.deleteById(id);
        return "Booking Cancelled!";
    }

    @GetMapping("/all")
    public List<Booking> getAll() {
        return repo.findAll();
    }
}
