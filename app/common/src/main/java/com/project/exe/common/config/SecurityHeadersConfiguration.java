package com.project.exe.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;

@Configuration
public class SecurityHeadersConfiguration {

    // Security headers are configured in ResourceServerConfigBase
    // This class provides utility methods for header configuration
    public static void configureSecurityHeaders(HeadersConfigurer<?> headers) {
        headers
                .contentSecurityPolicy(csp -> csp.policyDirectives("default-src 'self'"))
                .frameOptions(frame -> frame.deny())
                .httpStrictTransportSecurity(hsts -> hsts
                        .maxAgeInSeconds(31536000));
    }
}

