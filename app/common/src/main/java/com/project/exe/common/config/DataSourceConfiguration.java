package com.project.exe.common.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Configuration;

/**
 * Base DataSource configuration
 * Individual modules can extend this or provide their own DataSource configuration
 */
@Configuration
@ConditionalOnProperty(name = "spring.datasource.url")
public class DataSourceConfiguration {
    // Base DataSource configuration
    // Modules can override this with module-specific DataSource settings
}

