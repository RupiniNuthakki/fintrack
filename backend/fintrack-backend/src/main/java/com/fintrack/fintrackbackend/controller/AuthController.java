package com.fintrack.fintrackbackend.controller;

import com.fintrack.fintrackbackend.dto.LoginRequest;
import com.fintrack.fintrackbackend.dto.LoginResponse;
import com.fintrack.fintrackbackend.dto.RegisterRequest;
import com.fintrack.fintrackbackend.dto.UserResponse;
import com.fintrack.fintrackbackend.model.User;
import com.fintrack.fintrackbackend.service.UserService;
import com.fintrack.fintrackbackend.util.JwtUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;  // NEW: Inject JwtUtil

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            User user = userService.registerUser(
                    request.getEmail(),
                    request.getPassword(),
                    request.getName()
            );

            UserResponse response = UserResponse.fromUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: " + e.getMessage());
        }
    }

    // NEW: Login endpoint
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        try {
            User user = userService.login(request.getEmail(), request.getPassword());

            String token = jwtUtil.generateToken(user.getEmail());

            LoginResponse response = new LoginResponse(
                    token,
                    user.getEmail(),
                    user.getName()
            );

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Error: " + e.getMessage());
        }
    }
}