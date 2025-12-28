package com.project.exe.cronjob.config;

import com.project.exe.common.config.JpaAuditingConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import(JpaAuditingConfiguration.class)
public class CronjobJpaAuditingConfiguration {
    // JPA Auditing configuration for cronjob module
    // Inherits base configuration from common module
}

