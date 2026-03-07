package com.fintrack.fintrackbackend.dto;

import com.fintrack.fintrackbackend.model.Subscription;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateSubscriptionRequest {

    @NotBlank(message = "Subscription name is required")
    private String name;

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be positive")
    private BigDecimal amount;

    @NotNull(message = "Billing cycle is required")
    private Subscription.BillingCycle billingCycle;

    @NotNull(message = "Next billing date is required")
    private LocalDate nextBillingDate;

    private String description;
}