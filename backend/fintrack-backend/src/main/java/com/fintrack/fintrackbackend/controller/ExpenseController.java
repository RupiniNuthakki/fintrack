package com.fintrack.fintrackbackend.controller;

import com.fintrack.fintrackbackend.dto.AddExpenseRequest;
import com.fintrack.fintrackbackend.dto.ExpenseResponse;
import com.fintrack.fintrackbackend.dto.UpdateExpenseRequest;
import com.fintrack.fintrackbackend.model.Expense;
import com.fintrack.fintrackbackend.model.User;
import com.fintrack.fintrackbackend.service.ExpenseService;
import com.fintrack.fintrackbackend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;
    private final UserService userService;

    // Helper method to get currently logged-in user's email from JWT
    private String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();  // Returns email from JWT
    }

    @PostMapping
    public ResponseEntity<?> addExpense(@Valid @RequestBody AddExpenseRequest request) {
        try {
            // Get logged-in user's email from JWT token
            String email = getCurrentUserEmail();
            User user = userService.findByEmail(email);

            // Add expense
            Expense expense = expenseService.addExpense(
                    user,
                    request.getAmount(),
                    request.getCategory(),
                    request.getDescription(),
                    request.getDate()
            );

            ExpenseResponse response = ExpenseResponse.fromExpense(expense);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getUserExpenses() {
        try {
            // Get logged-in user's email from JWT token
            String email = getCurrentUserEmail();
            User user = userService.findByEmail(email);

            // Get expenses for this user
            List<Expense> expenses = expenseService.getUserExpenses(user.getId());

            List<ExpenseResponse> responses = expenses.stream()
                    .map(ExpenseResponse::fromExpense)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(responses);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/filter")
    public ResponseEntity<?> getExpensesByDateRange(
            @RequestParam String startDate,
            @RequestParam String endDate) {
        try {
            String email = getCurrentUserEmail();
            User user = userService.findByEmail(email);

            LocalDate start = LocalDate.parse(startDate);
            LocalDate end = LocalDate.parse(endDate);

            List<Expense> expenses = expenseService.getUserExpensesByDateRange(
                    user.getId(), start, end);

            List<ExpenseResponse> responses = expenses.stream()
                    .map(ExpenseResponse::fromExpense)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(responses);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/{expenseId}")
    public ResponseEntity<?> updateExpense(
            @PathVariable Long expenseId,
            @Valid @RequestBody UpdateExpenseRequest request) {
        try {
            // Get logged-in user's email from JWT token
            String email = getCurrentUserEmail();
            User user = userService.findByEmail(email);

            // Update expense
            Expense expense = expenseService.updateExpense(
                    expenseId,
                    user.getId(),
                    request.getAmount(),
                    request.getCategory(),
                    request.getDescription(),
                    request.getDate()
            );

            ExpenseResponse response = ExpenseResponse.fromExpense(expense);
            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{expenseId}")
    public ResponseEntity<?> deleteExpense(@PathVariable Long expenseId) {
        try {
            expenseService.deleteExpense(expenseId);
            return ResponseEntity.ok("Expense deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: " + e.getMessage());
        }
    }
}