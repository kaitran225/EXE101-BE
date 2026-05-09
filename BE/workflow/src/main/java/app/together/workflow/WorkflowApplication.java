package app.together.workflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Workflow service baseline: public health endpoint only.
 */
@SpringBootApplication(scanBasePackages = { "app.together.workflow", "app.together.common.shared" })
public class WorkflowApplication {

    public static void main(String[] args) {
        SpringApplication.run(WorkflowApplication.class, args);
    }
}
