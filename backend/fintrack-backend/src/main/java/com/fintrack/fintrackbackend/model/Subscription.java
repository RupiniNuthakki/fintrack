package com.fintrack.fintrackbackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "subscriptions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String name;  // "Netflix", "Spotify", "Gym Membership"

    @Column(nullable = false)
    private BigDecimal amount;  // Monthly cost

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private BillingCycle billingCycle;  // MONTHLY, YEARLY

    @Column(nullable = false)
    private LocalDate nextBillingDate;  // When is next charge

    private String description;  // Optional notes

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public enum BillingCycle {
        MONTHLY,
        YEARLY
    }
}