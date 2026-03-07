package com.fintrack.fintrackbackend.service;

import com.fintrack.fintrackbackend.dto.*;
import com.fintrack.fintrackbackend.model.Emi;
import com.fintrack.fintrackbackend.model.Expense;
import com.fintrack.fintrackbackend.model.Subscription;
import com.fintrack.fintrackbackend.repository.EmiRepository;
import com.fintrack.fintrackbackend.repository.ExpenseRepository;
import com.fintrack.fintrackbackend.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ExpenseRepository expenseRepository;
    private final EmiRepository emiRepository;
    private final SubscriptionRepository subscriptionRepository;

    public DashboardResponse getDashboard(Long userId) {
        // ===== EXPENSE METRICS =====
        BigDecimal totalSpending = expenseRepository.getTotalSpendingByUserId(userId);

        List<Object[]> categoryData = expenseRepository.getSpendingByCategoryForUser(userId);
        Map<String, BigDecimal> spendingByCategory = new HashMap<>();
        for (Object[] row : categoryData) {
            String category = (String) row[0];
            BigDecimal amount = (BigDecimal) row[1];
            spendingByCategory.put(category, amount);
        }

        BigDecimal monthlySpending = expenseRepository.getMonthlySpendingByUserId(userId);
        Long expenseCount = expenseRepository.countByUserId(userId);

        List<Expense> recentExpenses = expenseRepository.findTop5ByUserIdOrderByDateDesc(userId);
        List<ExpenseResponse> recentExpensesDto = recentExpenses.stream()
                .map(ExpenseResponse::fromExpense)
                .collect(Collectors.toList());

        // ===== EMI METRICS =====
        BigDecimal totalMonthlyEmi = emiRepository.getTotalMonthlyEmiByUserId(userId);
        Long emiCount = emiRepository.countByUserId(userId);

        // Get EMIs due in next 7 days
        LocalDate today = LocalDate.now();
        LocalDate next7Days = today.plusDays(7);
        List<Emi> upcomingEmis = emiRepository.findByUserIdAndNextDueDateBetween(userId, today, next7Days);
        List<EmiResponse> upcomingEmisDto = upcomingEmis.stream()
                .map(EmiResponse::fromEmi)
                .collect(Collectors.toList());

        // ===== SUBSCRIPTION METRICS =====
        BigDecimal totalMonthlySubscriptions = subscriptionRepository.getTotalMonthlySubscriptionCostByUserId(userId);
        Long subscriptionCount = subscriptionRepository.countByUserId(userId);

        // Get subscriptions due in next 7 days
        List<Subscription> upcomingSubscriptions = subscriptionRepository.findByUserIdAndNextBillingDateBetween(userId, today, next7Days);
        List<SubscriptionResponse> upcomingSubscriptionsDto = upcomingSubscriptions.stream()
                .map(SubscriptionResponse::fromSubscription)
                .collect(Collectors.toList());

        // ===== TOTAL MONTHLY OBLIGATIONS =====
        BigDecimal totalMonthlyObligations = totalMonthlyEmi.add(totalMonthlySubscriptions);

        // ===== RETURN COMPLETE DASHBOARD =====
        return new DashboardResponse(
                // Expense metrics (5 params)
                totalSpending,
                spendingByCategory,
                monthlySpending,
                expenseCount.intValue(),
                recentExpensesDto,

                // EMI metrics (3 params)
                totalMonthlyEmi,
                emiCount.intValue(),
                upcomingEmisDto,

                // Subscription metrics (3 params)
                totalMonthlySubscriptions,
                subscriptionCount.intValue(),
                upcomingSubscriptionsDto,

                // Total obligations (1 param)
                totalMonthlyObligations
        );
    }
}