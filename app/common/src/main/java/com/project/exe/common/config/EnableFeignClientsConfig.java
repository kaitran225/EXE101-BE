package com.project.exe.common.config;

import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableFeignClients(basePackages = "com.project.exe.common.feignclient")
public class EnableFeignClientsConfig {
    // Enables Feign clients scanning
}

