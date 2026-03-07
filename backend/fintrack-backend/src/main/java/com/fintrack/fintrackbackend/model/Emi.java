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
@Table(name = "emis")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Emi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String name;  // "Home Loan", "Car Loan", etc.

    @Column(nullable = false)
    private BigDecimal totalAmount;  // Total loan amount

    @Column(nullable = false)
    private BigDecimal monthlyAmount;  // Monthly payment

    @Column(nullable = false)
    private Integer totalMonths;  // Total duration in months

    @Column(nullable = false)
    private Integer remainingMonths;  // How many months left

    @Column(nullable = false)
    private LocalDate nextDueDate;  // When is next payment due

    @Column(nullable = false)
    private Integer dayOfMonth;  // Which day to pay (e.g., 5th of every month)

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
}