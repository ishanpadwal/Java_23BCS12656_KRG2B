package com.ticketbooking.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.ticketbooking.backend.model.User;
import com.ticketbooking.backend.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserRepository repo;

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        repo.save(user);
        return "User Registered Successfully!";
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        User u = repo.findByEmail(user.getEmail());
        if (u != null && u.getPassword().equals(user.getPassword())) {
            return "Login Successful!";
        } else {
            return "Invalid Email or Password!";
        }
    }

    @GetMapping("/all")
    public List<User> allUsers() {
        return repo.findAll();
    }
}
