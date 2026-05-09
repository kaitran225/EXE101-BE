package app.together.common.workflow.repository;

import app.together.common.workflow.entity.AppConfig;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppConfigRepository extends JpaRepository<AppConfig, String> {

    Optional<AppConfig> findByConfigKey(String configKey);
}
