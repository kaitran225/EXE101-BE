package app.together.common.workflow.repository;

import app.together.common.workflow.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {

    List<AuditLog> findByTableNameAndRecordId(String tableName, Long recordId);
}
