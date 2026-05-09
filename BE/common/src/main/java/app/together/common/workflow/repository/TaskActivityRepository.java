package app.together.common.workflow.repository;

import app.together.common.workflow.entity.TaskActivity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskActivityRepository extends JpaRepository<TaskActivity, Long> {

    List<TaskActivity> findByTaskId(Long taskId);
}
