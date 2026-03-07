package com.fintrack.fintrackbackend.repository;

import com.fintrack.fintrackbackend.model.Emi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface EmiRepository extends JpaRepository<Emi, Long> {

    // Find all EMIs for a user
    List<Emi> findByUserId(Long userId);

    // Find EMIs due within next N days
    List<Emi> findByUserIdAndNextDueDateBetween(Long userId, LocalDate startDate, LocalDate endDate);

    // Calculate total EMI amount per month for a user
    @Query("SELECT COALESCE(SUM(e.monthlyAmount), 0) FROM Emi e WHERE e.user.id = :userId")
    BigDecimal getTotalMonthlyEmiByUserId(@Param("userId") Long userId);

    // Count active EMIs
    long countByUserId(Long userId);
}