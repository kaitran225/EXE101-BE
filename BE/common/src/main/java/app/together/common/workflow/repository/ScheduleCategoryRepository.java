package app.together.common.workflow.repository;

import app.together.common.workflow.entity.ScheduleCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleCategoryRepository extends JpaRepository<ScheduleCategory, Long> {

    List<ScheduleCategory> findByUserSso(String userSso);
}
