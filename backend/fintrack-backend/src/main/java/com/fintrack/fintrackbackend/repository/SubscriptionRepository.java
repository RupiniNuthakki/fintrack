package com.fintrack.fintrackbackend.repository;

import com.fintrack.fintrackbackend.model.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    // Find all subscriptions for a user
    List<Subscription> findByUserId(Long userId);

    // Find subscriptions due within next N days
    List<Subscription> findByUserIdAndNextBillingDateBetween(Long userId, LocalDate startDate, LocalDate endDate);

    // Calculate total monthly subscription cost
    @Query("SELECT COALESCE(SUM(CASE WHEN s.billingCycle = 'MONTHLY' THEN s.amount WHEN s.billingCycle = 'YEARLY' THEN s.amount / 12 ELSE 0 END), 0) FROM Subscription s WHERE s.user.id = :userId")
    BigDecimal getTotalMonthlySubscriptionCostByUserId(@Param("userId") Long userId);

    // Count active subscriptions
    long countByUserId(Long userId);
}