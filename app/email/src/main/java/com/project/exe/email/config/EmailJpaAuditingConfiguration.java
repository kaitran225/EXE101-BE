package com.project.exe.email.config;

import com.project.exe.common.config.JpaAuditingConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import(JpaAuditingConfiguration.class)
public class EmailJpaAuditingConfiguration {
    // JPA Auditing configuration for email module
    // Inherits base configuration from common module
}

