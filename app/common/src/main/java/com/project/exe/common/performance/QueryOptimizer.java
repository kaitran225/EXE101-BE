package com.project.exe.common.performance;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class QueryOptimizer {

    public static Pageable optimizePageable(Pageable pageable) {
        if (pageable.getSort().isUnsorted()) {
            return pageable;
        }

        // Limit sort fields to prevent performance issues
        Sort.Order[] orders = pageable.getSort().stream()
                .limit(3) // Max 3 sort fields
                .toArray(Sort.Order[]::new);
        Sort optimizedSort = Sort.by(orders);

        return org.springframework.data.domain.PageRequest.of(
                pageable.getPageNumber(),
                Math.min(pageable.getPageSize(), 100), // Max page size
                optimizedSort
        );
    }
}

