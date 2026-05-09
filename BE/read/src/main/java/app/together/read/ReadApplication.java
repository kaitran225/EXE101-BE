package app.together.read;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Read service baseline: public health endpoint only.
 */
@SpringBootApplication(scanBasePackages = { "app.together.read", "app.together.common.shared" })
public class ReadApplication {

    public static void main(String[] args) {
        SpringApplication.run(ReadApplication.class, args);
    }
}
