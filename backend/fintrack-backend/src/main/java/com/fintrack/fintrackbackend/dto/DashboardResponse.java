package com.fintrack.fintrackbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {

    // Expense metrics
    private BigDecimal totalSpending;
    private Map<String, BigDecimal> spendingByCategory;
    private BigDecimal monthlySpending;
    private Integer totalExpenses;
    private List<ExpenseResponse> recentExpenses;

    // EMI metrics
    private BigDecimal totalMonthlyEmi;
    private Integer totalEmis;
    private List<EmiResponse> upcomingEmis;

    // Subscription metrics
    private BigDecimal totalMonthlySubscriptions;
    private Integer totalSubscriptions;
    private List<SubscriptionResponse> upcomingSubscriptions;

    // Overall financial summary
    private BigDecimal totalMonthlyObligations;  // EMIs + Subscriptions
}