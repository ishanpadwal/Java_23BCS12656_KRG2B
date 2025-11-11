package com.ticketbooking.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ticketbooking.backend.model.Booking;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
    List<Booking> findByShowtimeId(Integer showtimeId);
}
