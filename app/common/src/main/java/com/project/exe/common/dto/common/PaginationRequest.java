package com.project.exe.common.dto.common;

import com.project.exe.common.constant.Constant;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaginationRequest {

    @Min(0)
    @Builder.Default
    private int page = 0;

    @Min(1)
    @Max(Constant.MAX_PAGE_SIZE)
    @Builder.Default
    private int size = Constant.DEFAULT_PAGE_SIZE;

    private String sortBy;

    @Builder.Default
    private String sortDirection = Constant.DEFAULT_SORT_DIRECTION;

    public Pageable toPageable() {
        if (sortBy != null && !sortBy.isEmpty()) {
            Sort.Direction direction = sortDirection.equalsIgnoreCase("DESC")
                    ? Sort.Direction.DESC
                    : Sort.Direction.ASC;
            return PageRequest.of(page, size, Sort.by(direction, sortBy));
        }
        return PageRequest.of(page, size);
    }
}

