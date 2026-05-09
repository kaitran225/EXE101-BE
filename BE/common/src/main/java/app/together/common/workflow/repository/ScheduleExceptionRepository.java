package app.together.common.workflow.repository;

import app.together.common.workflow.entity.ScheduleException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleExceptionRepository extends JpaRepository<ScheduleException, Long> {

    List<ScheduleException> findByScheduleId(Long scheduleId);
}
