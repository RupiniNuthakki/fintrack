package com.fintrack.fintrackbackend.controller;

import com.fintrack.fintrackbackend.dto.DashboardResponse;
import com.fintrack.fintrackbackend.model.User;
import com.fintrack.fintrackbackend.service.DashboardService;
import com.fintrack.fintrackbackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;
    private final UserService userService;

    private String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    @GetMapping
    public ResponseEntity<?> getDashboard() {
        try {
            // Get logged-in user
            String email = getCurrentUserEmail();
            User user = userService.findByEmail(email);

            // Get dashboard data
            DashboardResponse dashboard = dashboardService.getDashboard(user.getId());

            return ResponseEntity.ok(dashboard);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}