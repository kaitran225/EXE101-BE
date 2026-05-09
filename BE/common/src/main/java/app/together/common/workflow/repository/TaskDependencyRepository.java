package app.together.common.workflow.repository;

import app.together.common.workflow.entity.TaskDependency;
import app.together.common.workflow.entity.TaskDependencyId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskDependencyRepository extends JpaRepository<TaskDependency, TaskDependencyId> {

    List<TaskDependency> findByTaskId(Long taskId);
}
