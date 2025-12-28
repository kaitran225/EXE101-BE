package com.project.exe.common.resilience;

import io.github.resilience4j.retry.Retry;
import io.github.resilience4j.retry.RetryConfig;
import io.github.resilience4j.retry.RetryRegistry;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.function.Supplier;

@Service
public class RetryService {

    private final Retry retry;

    public RetryService() {
        RetryConfig config = RetryConfig.custom()
                .maxAttempts(3)
                .waitDuration(Duration.ofMillis(1000))
                .retryOnException(throwable -> true)
                .build();

        RetryRegistry registry = RetryRegistry.of(config);
        this.retry = registry.retry("default");
    }

    public <T> T execute(Supplier<T> supplier) {
        return retry.executeSupplier(supplier);
    }

    public void execute(Runnable runnable) {
        retry.executeRunnable(runnable);
    }
}

