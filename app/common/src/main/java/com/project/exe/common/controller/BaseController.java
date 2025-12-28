package com.project.exe.common.controller;

import com.project.exe.common.dto.ApiResponse;
import com.project.exe.common.dto.common.PaginationResponse;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.function.Function;

@RequestMapping("/api/v1")
public abstract class BaseController {

    protected <T> ResponseEntity<ApiResponse<T>> success(T data) {
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    protected <T> ResponseEntity<ApiResponse<T>> success(String message, T data) {
        return ResponseEntity.ok(ApiResponse.success(message, data));
    }

    protected <T> ResponseEntity<ApiResponse<T>> created(T data) {
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(data));
    }

    protected <T> ResponseEntity<ApiResponse<T>> error(String message) {
        return ResponseEntity.badRequest().body(ApiResponse.error(message));
    }

    protected <T> ResponseEntity<ApiResponse<T>> error(HttpStatus status, String message) {
        return ResponseEntity.status(status).body(ApiResponse.error(message));
    }

    protected <T, R> PaginationResponse<R> toPaginationResponse(Page<T> page, Function<T, R> mapper) {
        return PaginationResponse.<R>builder()
                .content(page.getContent().stream().map(mapper).toList())
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .first(page.isFirst())
                .last(page.isLast())
                .build();
    }

    protected <T> PaginationResponse<T> toPaginationResponse(Page<T> page) {
        return PaginationResponse.<T>builder()
                .content(page.getContent())
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .first(page.isFirst())
                .last(page.isLast())
                .build();
    }
}

