package com.ticketbooking.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ticketbooking.backend.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String email);
}
