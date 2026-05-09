package app.together.common.workflow.repository;

import app.together.common.workflow.entity.RoomActivity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomActivityRepository extends JpaRepository<RoomActivity, Long> {

    List<RoomActivity> findByRoomId(Long roomId);
}
