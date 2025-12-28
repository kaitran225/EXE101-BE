package com.project.exe.cronjob.scheduler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Slf4j
public class ScheduledTasks {

    @Scheduled(fixedRate = 60000) // Run every 60 seconds
    public void scheduledTask() {
        log.info("Scheduled task executed at: {}", LocalDateTime.now());
    }
}

