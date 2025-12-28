package com.project.exe.common.config;

import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ActuatorConfiguration {

    @Bean
    public HealthIndicator customHealthIndicator() {
        return () -> org.springframework.boot.actuate.health.Health.up()
                .withDetail("status", "UP")
                .build();
    }
}

