package app.together.common.workflow.mapper;

import app.together.common.shared.mapper.BaseAuditMapper;

import app.together.common.workflow.dto.QuizDto;
import app.together.common.workflow.entity.Quiz;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING, uses = BaseAuditMapper.class)
public interface QuizMapper {

    QuizDto toDto(Quiz entity);

    @Mapping(target = "quizId", ignore = true)
    Quiz toEntity(QuizDto dto);

    @Mapping(target = "quizId", ignore = true)
    void updateEntity(@MappingTarget Quiz entity, QuizDto dto);

    Quiz copy(Quiz entity);

    Quiz deepCopy(Quiz entity);
}
