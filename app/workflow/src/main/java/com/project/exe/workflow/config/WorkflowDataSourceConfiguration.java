package com.project.exe.workflow.config;

import com.project.exe.common.config.DataSourceConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import(DataSourceConfiguration.class)
public class WorkflowDataSourceConfiguration {
    // DataSource configuration for workflow module
    // Inherits base configuration from common module
}

