package app.together.common.workflow.repository;

import app.together.common.workflow.entity.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {

    List<Meeting> findByTeamId(Long teamId);
}
