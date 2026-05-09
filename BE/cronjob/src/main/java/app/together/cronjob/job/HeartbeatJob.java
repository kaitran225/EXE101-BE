package app.together.cronjob.job;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Slf4j
@Component
public class HeartbeatJob {

    @Scheduled(cron = "${cronjob.heartbeat.cron:0 */5 * * * *}")
    public void heartbeat() {
        log.info("cronjob heartbeat at {}", Instant.now());
    }
}
