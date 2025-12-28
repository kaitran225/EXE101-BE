package com.project.exe.authen.config;

import com.project.exe.common.config.DataSourceConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import(DataSourceConfiguration.class)
public class AuthenDataSourceConfiguration {
    // DataSource configuration for authen module
    // Inherits base configuration from common module
}

