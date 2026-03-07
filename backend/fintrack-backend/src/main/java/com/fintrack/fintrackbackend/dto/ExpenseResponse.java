package com.fintrack.fintrackbackend.dto;

import com.fintrack.fintrackbackend.model.Expense;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseResponse {

    private Long id;
    private BigDecimal amount;
    private String category;
    private String description;
    private LocalDate date;
    private LocalDateTime createdAt;

    // Convert Expense entity to ExpenseResponse
    public static ExpenseResponse fromExpense(Expense expense) {
        return new ExpenseResponse(
                expense.getId(),
                expense.getAmount(),
                expense.getCategory(),
                expense.getDescription(),
                expense.getDate(),
                expense.getCreatedAt()
        );
    }
}