package com.project.exe.common.logging;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class LoggingConfiguration implements WebMvcConfigurer {

    private final RequestLoggingFilter requestLoggingFilter;

    public LoggingConfiguration(RequestLoggingFilter requestLoggingFilter) {
        this.requestLoggingFilter = requestLoggingFilter;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(requestLoggingFilter);
    }
}

