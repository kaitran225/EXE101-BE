package app.together.common.workflow.repository;

import app.together.common.workflow.entity.Flashcard;
import app.together.common.workflow.entity.FlashcardId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlashcardRepository extends JpaRepository<Flashcard, FlashcardId> {

    List<Flashcard> findByQuizId(Long quizId);
}
