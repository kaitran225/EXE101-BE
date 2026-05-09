package app.together.common.workflow.repository;

import app.together.common.workflow.entity.FlashcardReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlashcardReviewRepository extends JpaRepository<FlashcardReview, Long> {

    List<FlashcardReview> findByFlashcardId(Long flashcardId);
}
