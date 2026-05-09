package app.together.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import app.together.common.shared.exception.GlobalExceptionHandler;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
@ComponentScan(basePackages = { "app.together.auth", "app.together.common" })
@EnableJpaRepositories(basePackages = "app.together.common.auth.repository")
@EntityScan(basePackages = {
        "app.together.common.shared.persistence",
        "app.together.common.auth.entity"
})
@Import(GlobalExceptionHandler.class)
public class AuthApplication {

    public static void main(String[] args) {
        SpringApplication.run(AuthApplication.class, args);
    }
}
