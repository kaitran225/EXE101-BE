package app.together.common.workflow.repository;

import app.together.common.workflow.entity.QuizAnalytics;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuizAnalyticsRepository extends JpaRepository<QuizAnalytics, Long> {

    Optional<QuizAnalytics> findByUserMasterDataId(Long userMasterDataId);
}
