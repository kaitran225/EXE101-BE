package app.together.common.workflow.repository;

import app.together.common.workflow.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

    List<Quiz> findByUserSso(String userSso);
}
