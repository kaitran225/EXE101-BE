package com.project.exe.common.pagination;

import com.project.exe.common.dto.common.PaginationResponse;
import org.springframework.data.domain.Page;

public class PaginationHelper {

    public static <T> PaginationResponse<T> toPaginationResponse(Page<T> page) {
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

    public static <T, R> PaginationResponse<R> toPaginationResponse(Page<T> page,
                                                                    java.util.function.Function<T, R> mapper) {
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
}

