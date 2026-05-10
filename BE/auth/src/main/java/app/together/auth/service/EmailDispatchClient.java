package app.together.auth.service;

import app.together.common.email.api.EmailDispatchType;
import app.together.common.email.api.TransactionalEmailRequest;
import app.together.common.shared.http.HttpJsonClient;
import app.together.common.shared.http.InternalApiKeyHeader;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.net.URI;

/**
 * Sends transactional emails via the email microservice (HTTP).
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class EmailDispatchClient {

    private final HttpJsonClient httpJsonClient;

    @Value("${app.email-service.base-url}")
    private String emailServiceBaseUrl;

    @Value("${app.email-service.internal-api-key}")
    private String internalApiKey;

    @Value("${app.frontend.public-base-url}")
    private String linkBaseUrl;

    @Async
    public void sendVerificationEmail(String toEmail, String rawToken) {
        dispatch(new TransactionalEmailRequest(
                EmailDispatchType.VERIFY_ACCOUNT,
                toEmail,
                rawToken,
                normalizeBase(linkBaseUrl)));
    }

    @Async
    public void sendResetPasswordEmail(String toEmail, String rawToken) {
        dispatch(new TransactionalEmailRequest(
                EmailDispatchType.PASSWORD_RESET,
                toEmail,
                rawToken,
                normalizeBase(linkBaseUrl)));
    }

    private void dispatch(TransactionalEmailRequest body) {
        try {
            String url = normalizeBase(emailServiceBaseUrl) + "/api/v1/internal/emails/transactional";
            httpJsonClient.postJson(
                    URI.create(url),
                    body,
                    h -> h.set(InternalApiKeyHeader.NAME, internalApiKey));
        } catch (Exception e) {
            log.warn("Email dispatch failed type={} to={}", body.type(), body.toEmail(), e);
        }
    }

    private static String normalizeBase(String base) {
        if (base == null || base.isBlank()) {
            return "";
        }
        return base.replaceAll("/+$", "");
    }
}
