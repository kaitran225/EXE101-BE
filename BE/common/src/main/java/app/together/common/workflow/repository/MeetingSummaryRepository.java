package app.together.common.workflow.repository;

import app.together.common.workflow.entity.MeetingSummary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MeetingSummaryRepository extends JpaRepository<MeetingSummary, Long> {

    Optional<MeetingSummary> findByMeetingId(Long meetingId);
}
