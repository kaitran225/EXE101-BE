package app.together.common.workflow.mapper;

import app.together.common.shared.mapper.BaseAuditMapper;

import app.together.common.workflow.dto.AuditLogDto;
import app.together.common.workflow.entity.AuditLog;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, uses = BaseAuditMapper.class)
public interface AuditLogMapper {

    AuditLogDto toDto(AuditLog entity);

    @Mapping(target = "logId", ignore = true)
    AuditLog toEntity(AuditLogDto dto);

    @Mapping(target = "logId", ignore = true)
    void updateEntity(@MappingTarget AuditLog entity, AuditLogDto dto);

    AuditLog copy(AuditLog entity);

    AuditLog deepCopy(AuditLog entity);
}
