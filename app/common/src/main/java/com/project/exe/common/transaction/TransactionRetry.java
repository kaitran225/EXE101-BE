package com.project.exe.common.transaction;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;

import java.util.function.Supplier;

@Component
@EnableTransactionManagement
public class TransactionRetry {

    private static final Logger log = LoggerFactory.getLogger(TransactionRetry.class);

    @Retryable(
            value = {Exception.class},
            maxAttempts = 3,
            backoff = @Backoff(delay = 1000, multiplier = 2)
    )
    @Transactional
    public <T> T executeWithRetry(Supplier<T> operation) {
        log.info("Executing transaction with retry");
        return operation.get();
    }

    @Retryable(
            value = {Exception.class},
            maxAttempts = 3,
            backoff = @Backoff(delay = 1000, multiplier = 2)
    )
    @Transactional
    public void executeWithRetry(Runnable operation) {
        log.info("Executing transaction with retry");
        operation.run();
    }
}

