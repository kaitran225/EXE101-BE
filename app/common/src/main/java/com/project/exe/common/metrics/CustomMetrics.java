package com.project.exe.common.metrics;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import org.springframework.stereotype.Component;

@Component
public class CustomMetrics {

    private final Counter apiRequestCounter;
    private final Counter apiErrorCounter;
    private final Timer apiResponseTimer;

    public CustomMetrics(MeterRegistry registry) {
        this.apiRequestCounter = Counter.builder("api.requests.total")
                .description("Total number of API requests")
                .register(registry);
        this.apiErrorCounter = Counter.builder("api.errors.total")
                .description("Total number of API errors")
                .register(registry);
        this.apiResponseTimer = Timer.builder("api.response.time")
                .description("API response time")
                .register(registry);
    }

    public void incrementRequestCount() {
        apiRequestCounter.increment();
    }

    public void incrementErrorCount() {
        apiErrorCounter.increment();
    }

    public Timer.Sample startTimer() {
        return Timer.start();
    }

    public void recordTime(Timer.Sample sample) {
        sample.stop(apiResponseTimer);
    }
}

