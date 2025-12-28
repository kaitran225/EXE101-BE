package com.project.exe.common.resilience;

import io.github.resilience4j.circuitbreaker.CircuitBreaker;
import io.github.resilience4j.circuitbreaker.CircuitBreakerConfig;
import io.github.resilience4j.circuitbreaker.CircuitBreakerRegistry;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.function.Supplier;

@Service
public class CircuitBreakerService {

    private final CircuitBreaker circuitBreaker;

    public CircuitBreakerService() {
        CircuitBreakerConfig config = CircuitBreakerConfig.custom()
                .failureRateThreshold(50)
                .waitDurationInOpenState(Duration.ofMillis(1000))
                .slidingWindowSize(10)
                .build();

        CircuitBreakerRegistry registry = CircuitBreakerRegistry.of(config);
        this.circuitBreaker = registry.circuitBreaker("default");
    }

    public <T> T execute(Supplier<T> supplier) {
        return circuitBreaker.executeSupplier(supplier);
    }

    public void execute(Runnable runnable) {
        circuitBreaker.executeRunnable(runnable);
    }
}

