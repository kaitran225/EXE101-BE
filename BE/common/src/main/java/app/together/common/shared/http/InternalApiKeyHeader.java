package app.together.common.shared.http;

/**
 * Header name for service-to-service calls protected by a shared secret.
 */
public final class InternalApiKeyHeader {

    public static final String NAME = "X-Internal-Api-Key";

    private InternalApiKeyHeader() {}
}
