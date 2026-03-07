package com.fintrack.fintrackbackend.service;

import com.fintrack.fintrackbackend.model.Subscription;
import com.fintrack.fintrackbackend.model.User;
import com.fintrack.fintrackbackend.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubscriptionService {

    private final SubscriptionRepository subscriptionRepository;

    public Subscription addSubscription(User user, String name, BigDecimal amount,
                                        Subscription.BillingCycle billingCycle,
                                        LocalDate nextBillingDate, String description) {
        Subscription subscription = new Subscription();
        subscription.setUser(user);
        subscription.setName(name);
        subscription.setAmount(amount);
        subscription.setBillingCycle(billingCycle);
        subscription.setNextBillingDate(nextBillingDate);
        subscription.setDescription(description);

        return subscriptionRepository.save(subscription);
    }

    public List<Subscription> getUserSubscriptions(Long userId) {
        return subscriptionRepository.findByUserId(userId);
    }

    public void deleteSubscription(Long subscriptionId) {
        subscriptionRepository.deleteById(subscriptionId);
    }

    public BigDecimal getTotalMonthlySubscriptionCost(Long userId) {
        return subscriptionRepository.getTotalMonthlySubscriptionCostByUserId(userId);
    }

    public Subscription updateSubscription(Long subscriptionId, Long userId, String name,
                                           BigDecimal amount, Subscription.BillingCycle billingCycle,
                                           LocalDate nextBillingDate, String description) {
        // Find subscription
        Subscription subscription = subscriptionRepository.findById(subscriptionId)
                .orElseThrow(() -> new RuntimeException("Subscription not found"));

        // Security check: Make sure subscription belongs to this user
        if (!subscription.getUser().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized: You can only update your own subscriptions");
        }

        // Update fields
        subscription.setName(name);
        subscription.setAmount(amount);
        subscription.setBillingCycle(billingCycle);
        subscription.setNextBillingDate(nextBillingDate);
        subscription.setDescription(description);

        return subscriptionRepository.save(subscription);
    }
}