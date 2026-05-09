package app.together.common.auth.mapper;

import app.together.common.auth.dto.UserDto;
import app.together.common.auth.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserMapper {

    UserDto toDto(User entity);

    @Mapping(target = "userId", ignore = true)
    User toEntity(UserDto dto);

    @Mapping(target = "userId", ignore = true)
    void updateEntity(@MappingTarget User entity, UserDto dto);

    User copy(User entity);

    User deepCopy(User entity);
}
