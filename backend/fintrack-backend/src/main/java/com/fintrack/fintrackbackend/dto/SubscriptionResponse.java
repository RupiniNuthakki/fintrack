package com.fintrack.fintrackbackend.dto;

import com.fintrack.fintrackbackend.model.Subscription;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionResponse {

    private Long id;
    private String name;
    private BigDecimal amount;
    private Subscription.BillingCycle billingCycle;
    private LocalDate nextBillingDate;
    private String description;
    private LocalDateTime createdAt;

    public static SubscriptionResponse fromSubscription(Subscription subscription) {
        return new SubscriptionResponse(
                subscription.getId(),
                subscription.getName(),
                subscription.getAmount(),
                subscription.getBillingCycle(),
                subscription.getNextBillingDate(),
                subscription.getDescription(),
                subscription.getCreatedAt()
        );
    }
}