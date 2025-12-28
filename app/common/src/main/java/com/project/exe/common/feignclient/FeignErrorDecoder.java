package com.project.exe.common.feignclient;

import feign.Response;
import feign.codec.ErrorDecoder;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class FeignErrorDecoder implements ErrorDecoder {

    @Override
    public Exception decode(String methodKey, Response response) {
        HttpStatus status = HttpStatus.valueOf(response.status());
        String message = String.format("Feign client error: %s - %s", methodKey, status);
        return new ResponseStatusException(status, message);
    }
}

