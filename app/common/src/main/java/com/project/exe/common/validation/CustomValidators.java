package com.project.exe.common.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class CustomValidators {

    public static class EmailValidator implements ConstraintValidator<ValidEmail, String> {
        private static final String EMAIL_PATTERN = "^[A-Za-z0-9+_.-]+@(.+)$";

        @Override
        public void initialize(ValidEmail constraintAnnotation) {
        }

        @Override
        public boolean isValid(String email, ConstraintValidatorContext context) {
            if (email == null || email.isEmpty()) {
                return true; // Let @NotNull handle null/empty
            }
            return email.matches(EMAIL_PATTERN);
        }
    }

    public static class PhoneValidator implements ConstraintValidator<ValidPhone, String> {
        private static final String PHONE_PATTERN = "^[+]?[(]?[0-9]{1,4}[)]?[-\\s.]?[(]?[0-9]{1,4}[)]?[-\\s.]?[0-9]{1,9}$";

        @Override
        public void initialize(ValidPhone constraintAnnotation) {
        }

        @Override
        public boolean isValid(String phone, ConstraintValidatorContext context) {
            if (phone == null || phone.isEmpty()) {
                return true; // Let @NotNull handle null/empty
            }
            return phone.matches(PHONE_PATTERN);
        }
    }
}

