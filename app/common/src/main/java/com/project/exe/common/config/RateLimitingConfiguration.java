package com.project.exe.common.config;

import com.project.exe.common.security.RateLimiter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RateLimitingConfiguration {

    @Bean
    public RateLimiter rateLimiter() {
        return new RateLimiter();
    }
}

