package com.project.exe.common.audit;

import com.project.exe.common.repository.BaseRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuditRepository extends BaseRepository<AuditEntity> {
}

