package com.project.exe.email.config;

import com.project.exe.common.config.SecurityConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import(SecurityConfig.class)
public class ResourceServerConfig {
    // Security configuration is provided by common SecurityConfig
}

