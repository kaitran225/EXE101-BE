package com.project.exe.workflow.config;

import com.project.exe.common.config.JpaAuditingConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import(JpaAuditingConfiguration.class)
public class WorkflowJpaAuditingConfiguration {
    // JPA Auditing configuration for workflow module
    // Inherits base configuration from common module
}

