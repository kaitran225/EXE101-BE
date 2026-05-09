package app.together.common.workflow.repository;

import app.together.common.workflow.entity.UserMasterData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserMasterDataRepository extends JpaRepository<UserMasterData, Long> {

    Optional<UserMasterData> findByUserSso(String userSso);
}
