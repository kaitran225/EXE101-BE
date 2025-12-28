package com.project.exe.authen.config;

import com.project.exe.common.config.JpaAuditingConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import(JpaAuditingConfiguration.class)
public class AuthenJpaAuditingConfiguration {
    // JPA Auditing configuration for authen module
    // Inherits base configuration from common module
}

