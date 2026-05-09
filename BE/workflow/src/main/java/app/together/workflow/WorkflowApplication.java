package app.together.workflow;

import app.together.common.auth.service.AuthService;
import app.together.common.auth.service.EmailService;
import app.together.common.auth.service.TokenService;
import app.together.common.auth.service.UserService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(
        scanBasePackages = { "app.together.workflow", "app.together.common" },
        excludeFilters = @ComponentScan.Filter(
                type = FilterType.ASSIGNABLE_TYPE,
                classes = { AuthService.class, EmailService.class, TokenService.class, UserService.class }
        )
)
@EntityScan(basePackages = {
        "app.together.common.shared.persistence",
        "app.together.common.workflow.entity",
        "app.together.common.workflow.entity.converters"
})
@EnableJpaRepositories("app.together.common.workflow.repository")
public class WorkflowApplication {

    public static void main(String[] args) {
        SpringApplication.run(WorkflowApplication.class, args);
    }
}
