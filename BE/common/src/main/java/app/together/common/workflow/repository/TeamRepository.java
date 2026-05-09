package app.together.common.workflow.repository;

import app.together.common.workflow.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {

    java.util.Optional<Team> findByInviteCode(String inviteCode);
}
