package com.project.exe.email.config;

import com.project.exe.common.config.DataSourceConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import(DataSourceConfiguration.class)
public class EmailDataSourceConfiguration {
    // DataSource configuration for email module
    // Inherits base configuration from common module
}

