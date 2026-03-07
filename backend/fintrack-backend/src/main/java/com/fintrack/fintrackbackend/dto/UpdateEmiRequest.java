package com.fintrack.fintrackbackend.dto;

import jakarta.validation.constraints.Min;
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
public class UpdateEmiRequest {

    @NotBlank(message = "EMI name is required")
    private String name;

    @NotNull(message = "Total amount is required")
    @Positive(message = "Total amount must be positive")
    private BigDecimal totalAmount;

    @NotNull(message = "Monthly amount is required")
    @Positive(message = "Monthly amount must be positive")
    private BigDecimal monthlyAmount;

    @NotNull(message = "Remaining months is required")
    @Min(value = 0, message = "Remaining months cannot be negative")
    private Integer remainingMonths;

    @NotNull(message = "Next due date is required")
    private LocalDate nextDueDate;

    @NotNull(message = "Day of month is required")
    @Min(value = 1, message = "Day must be between 1 and 31")
    private Integer dayOfMonth;
}