package com.project.exe.common.validation;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class ValidationUtils {

    private final Validator validator;

    public ValidationUtils(Validator validator) {
        this.validator = validator;
    }

    public <T> Set<String> validate(T object) {
        Set<ConstraintViolation<T>> violations = validator.validate(object);
        return violations.stream()
                .map(ConstraintViolation::getMessage)
                .collect(Collectors.toSet());
    }

    public <T> boolean isValid(T object) {
        return validator.validate(object).isEmpty();
    }
}

