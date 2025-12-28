package com.project.exe.common.constant;

import lombok.experimental.UtilityClass;

@UtilityClass
public class MessageConstant {

    // Success Messages
    public static final String SUCCESS = "Operation completed successfully";
    public static final String CREATED = "Resource created successfully";
    public static final String UPDATED = "Resource updated successfully";
    public static final String DELETED = "Resource deleted successfully";

    // Error Messages
    public static final String NOT_FOUND = "Resource not found";
    public static final String VALIDATION_ERROR = "Validation failed";
    public static final String UNAUTHORIZED = "Unauthorized access";
    public static final String FORBIDDEN = "Access forbidden";
    public static final String INTERNAL_ERROR = "Internal server error";

    // Common Messages
    public static final String INVALID_INPUT = "Invalid input provided";
    public static final String OPERATION_FAILED = "Operation failed";
}

