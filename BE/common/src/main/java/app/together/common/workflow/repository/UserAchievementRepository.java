package app.together.common.workflow.repository;

import app.together.common.workflow.entity.UserAchievement;
import app.together.common.workflow.entity.UserAchievementId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserAchievementRepository extends JpaRepository<UserAchievement, UserAchievementId> {

    List<UserAchievement> findByUserSso(String userSso);
}
