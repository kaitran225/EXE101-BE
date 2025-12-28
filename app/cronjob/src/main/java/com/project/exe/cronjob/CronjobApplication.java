package com.project.exe.cronjob;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@ComponentScan(basePackages = {"com.project.exe.cronjob", "com.project.exe.common"})
public class CronjobApplication {

    public static void main(String[] args) {
        SpringApplication.run(CronjobApplication.class, args);
    }

}

