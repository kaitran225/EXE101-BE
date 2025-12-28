package com.project.exe.common.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface BaseMapper {
    // Base mapper interface for common mapping configurations
    // Individual mappers should extend or use this configuration
}

