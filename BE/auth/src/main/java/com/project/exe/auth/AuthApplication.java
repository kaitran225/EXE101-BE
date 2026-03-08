package com.project.exe.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.Import;

import com.project.exe.common.config.SecurityConfig;
import com.project.exe.common.exception.GlobalExceptionHandler;

@SpringBootApplication(scanBasePackages = { "com.project.exe.auth", "com.project.exe.common" })
@ComponentScan(excludeFilters = @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class))
@Import(GlobalExceptionHandler.class)
public class AuthApplication {

    public static void main(String[] args) {
        SpringApplication.run(AuthApplication.class, args);
    }
}
