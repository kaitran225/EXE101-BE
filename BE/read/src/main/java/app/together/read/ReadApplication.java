package app.together.read;

import app.together.common.shared.exception.GlobalExceptionHandler;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = { "app.together.read", "app.together.common" })
@EnableJpaRepositories(basePackages = "app.together.common.auth.repository")
@EntityScan(basePackages = {
        "app.together.common.shared.persistence",
        "app.together.common.auth.entity"
})

public class ReadApplication {

    public static void main(String[] args) {
        SpringApplication.run(ReadApplication.class, args);
    }
}
