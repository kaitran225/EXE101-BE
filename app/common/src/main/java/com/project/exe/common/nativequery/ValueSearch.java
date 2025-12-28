package com.project.exe.common.nativequery;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ValueSearch {
    private String value;
    private SearchType searchType;

    public boolean isEmpty() {
        return value == null || value.trim().isEmpty();
    }

    public enum SearchType {
        EQUALS,
        CONTAINS,
        STARTS_WITH,
        ENDS_WITH,
        IN
    }
}

