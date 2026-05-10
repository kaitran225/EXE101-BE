package app.together.common.email.api;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * Payload for POST /api/v1/internal/emails/transactional (email microservice).
 */
public record TransactionalEmailRequest(
        @NotNull EmailDispatchType type,
        @NotBlank @Email String toEmail,
        @NotBlank String rawToken,
        /** e.g. https://app.example.com — links are built as {@code linkBaseUrl + path + token} */
        @NotBlank String linkBaseUrl) {
}
