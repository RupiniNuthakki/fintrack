package com.fintrack.fintrackbackend.controller;

import com.fintrack.fintrackbackend.dto.AddEmiRequest;
import com.fintrack.fintrackbackend.dto.EmiResponse;
import com.fintrack.fintrackbackend.dto.UpdateEmiRequest;
import com.fintrack.fintrackbackend.model.Emi;
import com.fintrack.fintrackbackend.model.User;
import com.fintrack.fintrackbackend.service.EmiService;
import com.fintrack.fintrackbackend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/emis")
@RequiredArgsConstructor
public class EmiController {

    private final EmiService emiService;
    private final UserService userService;

    private String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    @PostMapping
    public ResponseEntity<?> addEmi(@Valid @RequestBody AddEmiRequest request) {
        try {
            String email = getCurrentUserEmail();
            User user = userService.findByEmail(email);

            Emi emi = emiService.addEmi(
                    user,
                    request.getName(),
                    request.getTotalAmount(),
                    request.getMonthlyAmount(),
                    request.getTotalMonths(),
                    request.getNextDueDate(),
                    request.getDayOfMonth()
            );

            EmiResponse response = EmiResponse.fromEmi(emi);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getUserEmis() {
        try {
            String email = getCurrentUserEmail();
            User user = userService.findByEmail(email);

            List<Emi> emis = emiService.getUserEmis(user.getId());

            List<EmiResponse> responses = emis.stream()
                    .map(EmiResponse::fromEmi)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(responses);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/{emiId}")
    public ResponseEntity<?> updateEmi(
            @PathVariable Long emiId,
            @Valid @RequestBody UpdateEmiRequest request) {
        try {
            String email = getCurrentUserEmail();
            User user = userService.findByEmail(email);

            Emi emi = emiService.updateEmi(
                    emiId,
                    user.getId(),
                    request.getName(),
                    request.getTotalAmount(),
                    request.getMonthlyAmount(),
                    request.getRemainingMonths(),
                    request.getNextDueDate(),
                    request.getDayOfMonth()
            );

            EmiResponse response = EmiResponse.fromEmi(emi);
            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{emiId}")
    public ResponseEntity<?> deleteEmi(@PathVariable Long emiId) {
        try {
            emiService.deleteEmi(emiId);
            return ResponseEntity.ok("EMI deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: " + e.getMessage());
        }
    }
}