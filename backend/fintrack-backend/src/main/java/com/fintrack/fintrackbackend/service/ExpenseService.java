package com.fintrack.fintrackbackend.service;

import com.fintrack.fintrackbackend.model.Expense;
import com.fintrack.fintrackbackend.model.User;
import com.fintrack.fintrackbackend.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    public Expense addExpense(User user, BigDecimal amount, String category,
                              String description, LocalDate date) {
        Expense expense = new Expense();
        expense.setUser(user);
        expense.setAmount(amount);
        expense.setCategory(category);
        expense.setDescription(description);
        expense.setDate(date);

        return expenseRepository.save(expense);
    }

    public List<Expense> getUserExpenses(Long userId) {
        return expenseRepository.findByUserId(userId);
    }

    public List<Expense> getUserExpensesByCategory(Long userId, String category) {
        return expenseRepository.findByUserIdAndCategory(userId, category);
    }

    public List<Expense> getUserExpensesByDateRange(Long userId, LocalDate startDate, LocalDate endDate) {
        return expenseRepository.findByUserIdAndDateBetween(userId, startDate, endDate);
    }

    public Expense updateExpense(Long expenseId, Long userId, BigDecimal amount,
                                 String category, String description, LocalDate date) {
        // Find expense
        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        // Security check: Make sure expense belongs to this user
        if (!expense.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized: You can only update your own expenses");
        }

        // Update fields
        expense.setAmount(amount);
        expense.setCategory(category);
        expense.setDescription(description);
        expense.setDate(date);

        // Save and return
        return expenseRepository.save(expense);
    }

    public void deleteExpense(Long expenseId) {
        expenseRepository.deleteById(expenseId);
    }
}