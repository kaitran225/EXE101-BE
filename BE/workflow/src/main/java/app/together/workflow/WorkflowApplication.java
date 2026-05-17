package app.together.workflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Workflow service baseline: room management + WebSocket signaling.
 */
@SpringBootApplication(scanBasePackages = { "app.together.workflow", "app.together.common.shared", "app.together.common.workflow" })
public class WorkflowApplication {

    public static void main(String[] args) {
        SpringApplication.run(WorkflowApplication.class, args);
    }
}
