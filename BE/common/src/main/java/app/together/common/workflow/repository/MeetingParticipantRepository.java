package app.together.common.workflow.repository;

import app.together.common.workflow.entity.MeetingParticipant;
import app.together.common.workflow.entity.MeetingParticipantId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MeetingParticipantRepository extends JpaRepository<MeetingParticipant, MeetingParticipantId> {

    List<MeetingParticipant> findByMeetingId(Long meetingId);
}
