package com.project.exe.common.async;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.util.concurrent.CompletableFuture;
import java.util.function.Supplier;

@Slf4j
@Component
public class AsyncExecutor {

    @Async("taskExecutor")
    public <T> CompletableFuture<T> executeAsync(Supplier<T> task) {
        log.info("Executing async task");
        try {
            T result = task.get();
            return CompletableFuture.completedFuture(result);
        } catch (Exception e) {
            log.error("Async task failed", e);
            return CompletableFuture.failedFuture(e);
        }
    }

    @Async("taskExecutor")
    public CompletableFuture<Void> executeAsync(Runnable task) {
        log.info("Executing async void task");
        try {
            task.run();
            return CompletableFuture.completedFuture(null);
        } catch (Exception e) {
            log.error("Async task failed", e);
            return CompletableFuture.failedFuture(e);
        }
    }
}

