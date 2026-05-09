package app.together.common.workflow.repository;

import app.together.common.workflow.entity.UserRoomSlot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRoomSlotRepository extends JpaRepository<UserRoomSlot, String> {

    Optional<UserRoomSlot> findByUserSso(String userSso);
}
