package app.together.common.workflow.repository;

import app.together.common.workflow.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByTeamId(Long teamId);
}
