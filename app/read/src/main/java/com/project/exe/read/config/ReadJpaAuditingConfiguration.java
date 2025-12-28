package com.project.exe.read.config;

import com.project.exe.common.config.JpaAuditingConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import(JpaAuditingConfiguration.class)
public class ReadJpaAuditingConfiguration {
    // JPA Auditing configuration for read module
    // Inherits base configuration from common module
}

