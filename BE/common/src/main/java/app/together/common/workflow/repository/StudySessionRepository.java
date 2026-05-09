package app.together.common.workflow.repository;

import app.together.common.workflow.entity.StudySession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudySessionRepository extends JpaRepository<StudySession, Long> {

    List<StudySession> findByUserMasterDataId(Long userMasterDataId);
}
