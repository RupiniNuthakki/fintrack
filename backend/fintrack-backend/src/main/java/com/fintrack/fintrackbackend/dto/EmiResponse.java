package com.fintrack.fintrackbackend.dto;

import com.fintrack.fintrackbackend.model.Emi;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmiResponse {

    private Long id;
    private String name;
    private BigDecimal totalAmount;
    private BigDecimal monthlyAmount;
    private Integer totalMonths;
    private Integer remainingMonths;
    private LocalDate nextDueDate;
    private Integer dayOfMonth;
    private LocalDateTime createdAt;

    public static EmiResponse fromEmi(Emi emi) {
        return new EmiResponse(
                emi.getId(),
                emi.getName(),
                emi.getTotalAmount(),
                emi.getMonthlyAmount(),
                emi.getTotalMonths(),
                emi.getRemainingMonths(),
                emi.getNextDueDate(),
                emi.getDayOfMonth(),
                emi.getCreatedAt()
        );
    }
}