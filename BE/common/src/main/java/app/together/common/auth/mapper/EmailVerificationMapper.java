package app.together.common.auth.mapper;

import app.together.common.shared.mapper.BaseAuditMapper;

import app.together.common.auth.dto.EmailVerificationDto;
import app.together.common.auth.entity.EmailVerification;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, uses = BaseAuditMapper.class)
public interface EmailVerificationMapper {

    EmailVerificationDto toDto(EmailVerification entity);

    @Mapping(target = "verificationId", ignore = true)
    EmailVerification toEntity(EmailVerificationDto dto);

    @Mapping(target = "verificationId", ignore = true)
    void updateEntity(@MappingTarget EmailVerification entity, EmailVerificationDto dto);

    EmailVerification copy(EmailVerification entity);

    EmailVerification deepCopy(EmailVerification entity);
}
