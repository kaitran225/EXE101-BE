package app.together.common.workflow.repository;

import app.together.common.workflow.entity.Summary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SummaryRepository extends JpaRepository<Summary, Long> {

    List<Summary> findByDocumentId(Long documentId);
}
