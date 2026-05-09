package app.together.cronjob;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(
        scanBasePackages = { "app.together.cronjob", "app.together.common" },
        exclude = { DataSourceAutoConfiguration.class, HibernateJpaAutoConfiguration.class }
)
@EnableScheduling
public class CronjobApplication {

    public static void main(String[] args) {
        SpringApplication.run(CronjobApplication.class, args);
    }
}
