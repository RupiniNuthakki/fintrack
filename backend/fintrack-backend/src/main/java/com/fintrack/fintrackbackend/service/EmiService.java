package com.fintrack.fintrackbackend.service;

import com.fintrack.fintrackbackend.model.Emi;
import com.fintrack.fintrackbackend.model.User;
import com.fintrack.fintrackbackend.repository.EmiRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmiService {

    private final EmiRepository emiRepository;

    public Emi addEmi(User user, String name, BigDecimal totalAmount,
                      BigDecimal monthlyAmount, Integer totalMonths,
                      LocalDate nextDueDate, Integer dayOfMonth) {
        Emi emi = new Emi();
        emi.setUser(user);
        emi.setName(name);
        emi.setTotalAmount(totalAmount);
        emi.setMonthlyAmount(monthlyAmount);
        emi.setTotalMonths(totalMonths);
        emi.setRemainingMonths(totalMonths);  // Initially same as total
        emi.setNextDueDate(nextDueDate);
        emi.setDayOfMonth(dayOfMonth);

        return emiRepository.save(emi);
    }

    public List<Emi> getUserEmis(Long userId) {
        return emiRepository.findByUserId(userId);
    }

    public void deleteEmi(Long emiId) {
        emiRepository.deleteById(emiId);
    }

    public BigDecimal getTotalMonthlyEmi(Long userId) {
        return emiRepository.getTotalMonthlyEmiByUserId(userId);
    }

    public Emi updateEmi(Long emiId, Long userId, String name, BigDecimal totalAmount,
                         BigDecimal monthlyAmount, Integer remainingMonths,
                         LocalDate nextDueDate, Integer dayOfMonth) {
        // Find EMI
        Emi emi = emiRepository.findById(emiId)
                .orElseThrow(() -> new RuntimeException("EMI not found"));

        // Security check: Make sure EMI belongs to this user
        if (!emi.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized: You can only update your own EMIs");
        }

        // Update fields
        emi.setName(name);
        emi.setTotalAmount(totalAmount);
        emi.setMonthlyAmount(monthlyAmount);
        emi.setRemainingMonths(remainingMonths);
        emi.setNextDueDate(nextDueDate);
        emi.setDayOfMonth(dayOfMonth);

        return emiRepository.save(emi);
    }
}