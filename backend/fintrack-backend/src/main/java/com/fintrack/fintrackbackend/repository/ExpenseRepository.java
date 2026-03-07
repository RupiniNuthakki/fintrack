package com.fintrack.fintrackbackend.repository;

import com.fintrack.fintrackbackend.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    // Find all expenses for a specific user
    List<Expense> findByUserId(Long userId);

    // Find expenses by user and date range
    List<Expense> findByUserIdAndDateBetween(Long userId, LocalDate startDate, LocalDate endDate);

    // Find expenses by user and category
    List<Expense> findByUserIdAndCategory(Long userId, String category);

    // Calculate total spending for a user
    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e WHERE e.user.id = :userId")
    BigDecimal getTotalSpendingByUserId(@Param("userId") Long userId);

    // Calculate spending by category
    @Query("SELECT e.category, SUM(e.amount) FROM Expense e WHERE e.user.id = :userId GROUP BY e.category")
    List<Object[]> getSpendingByCategoryForUser(@Param("userId") Long userId);

    // Calculate monthly spending (current month)
    @Query("SELECT COALESCE(SUM(e.amount), 0) FROM Expense e WHERE e.user.id = :userId AND YEAR(e.date) = YEAR(CURRENT_DATE) AND MONTH(e.date) = MONTH(CURRENT_DATE)")
    BigDecimal getMonthlySpendingByUserId(@Param("userId") Long userId);

    // Count total expenses
    long countByUserId(Long userId);

    // Get recent expenses (last 5)
    List<Expense> findTop5ByUserIdOrderByDateDesc(Long userId);
}
