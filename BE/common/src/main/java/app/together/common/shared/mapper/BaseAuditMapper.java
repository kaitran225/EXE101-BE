package app.together.common.shared.mapper;

import app.together.common.shared.dto.BaseAuditDTO;
import app.together.common.shared.persistence.BaseAuditEntity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

/**
 * Maps audit columns between {@link BaseAuditEntity} and {@link BaseAuditDTO}.
 * Referenced from entity MapStruct mappers via {@code uses}.
 */
@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface BaseAuditMapper {

    BaseAuditDTO toDto(BaseAuditEntity entity);
}
