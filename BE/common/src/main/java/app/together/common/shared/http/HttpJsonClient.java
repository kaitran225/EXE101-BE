package app.together.common.shared.http;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientException;

import java.net.URI;
import java.time.Duration;
import java.util.Map;
import java.util.function.Consumer;

/**
 * Small JSON POST helper for service-to-service calls (RestClient + timeouts).
 */
@Component
public class HttpJsonClient {

    private final RestClient client;

    public HttpJsonClient() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(Duration.ofSeconds(5));
        factory.setReadTimeout(Duration.ofSeconds(30));
        this.client = RestClient.builder().requestFactory(factory).build();
    }

    /**
     * POST JSON body; throws {@link RestClientException} on network or 4xx/5xx (default handler).
     */
    public void postJson(URI uri, Object body, Consumer<HttpHeaders> headersCustomizer) {
        var req = client.post()
                .uri(uri)
                .contentType(MediaType.APPLICATION_JSON)
                .headers(headersCustomizer != null ? headersCustomizer : h -> {});
        req.body(body).retrieve().toBodilessEntity();
    }

    public void postJson(URI uri, Object body) {
        postJson(uri, body, null);
    }

    public void postJson(String url, Object body, Map<String, String> headers) {
        postJson(URI.create(url), body, h -> {
            if (headers != null) {
                headers.forEach(h::set);
            }
        });
    }
}
