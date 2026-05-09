package app.together.common.workflow.repository;

import app.together.common.workflow.entity.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {

    List<QuizAttempt> findByQuizIdAndUserSso(Long quizId, String userSso);
}
