package com.project.exe.cronjob.config;

import com.project.exe.common.config.DataSourceConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import(DataSourceConfiguration.class)
public class CronjobDataSourceConfiguration {
    // DataSource configuration for cronjob module
    // Inherits base configuration from common module
}

