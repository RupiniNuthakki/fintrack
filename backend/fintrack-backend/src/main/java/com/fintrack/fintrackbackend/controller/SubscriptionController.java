package com.fintrack.fintrackbackend.controller;

import com.fintrack.fintrackbackend.dto.AddSubscriptionRequest;
import com.fintrack.fintrackbackend.dto.SubscriptionResponse;
import com.fintrack.fintrackbackend.dto.UpdateSubscriptionRequest;
import com.fintrack.fintrackbackend.model.Subscription;
import com.fintrack.fintrackbackend.model.User;
import com.fintrack.fintrackbackend.service.SubscriptionService;
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
@RequestMapping("/api/subscriptions")
@RequiredArgsConstructor
public class SubscriptionController {

    private final SubscriptionService subscriptionService;
    private final UserService userService;

    private String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }

    @PostMapping
    public ResponseEntity<?> addSubscription(@Valid @RequestBody AddSubscriptionRequest request) {
        try {
            String email = getCurrentUserEmail();
            User user = userService.findByEmail(email);

            Subscription subscription = subscriptionService.addSubscription(
                    user,
                    request.getName(),
                    request.getAmount(),
                    request.getBillingCycle(),
                    request.getNextBillingDate(),
                    request.getDescription()
            );

            SubscriptionResponse response = SubscriptionResponse.fromSubscription(subscription);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getUserSubscriptions() {
        try {
            String email = getCurrentUserEmail();
            User user = userService.findByEmail(email);

            List<Subscription> subscriptions = subscriptionService.getUserSubscriptions(user.getId());

            List<SubscriptionResponse> responses = subscriptions.stream()
                    .map(SubscriptionResponse::fromSubscription)
                    .collect(Collectors.toList());

            return ResponseEntity.ok(responses);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: " + e.getMessage());
        }
    }

    @PutMapping("/{subscriptionId}")
    public ResponseEntity<?> updateSubscription(
            @PathVariable Long subscriptionId,
            @Valid @RequestBody UpdateSubscriptionRequest request) {
        try {
            String email = getCurrentUserEmail();
            User user = userService.findByEmail(email);

            Subscription subscription = subscriptionService.updateSubscription(
                    subscriptionId,
                    user.getId(),
                    request.getName(),
                    request.getAmount(),
                    request.getBillingCycle(),
                    request.getNextBillingDate(),
                    request.getDescription()
            );

            SubscriptionResponse response = SubscriptionResponse.fromSubscription(subscription);
            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping("/{subscriptionId}")
    public ResponseEntity<?> deleteSubscription(@PathVariable Long subscriptionId) {
        try {
            subscriptionService.deleteSubscription(subscriptionId);
            return ResponseEntity.ok("Subscription deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: " + e.getMessage());
        }
    }
}