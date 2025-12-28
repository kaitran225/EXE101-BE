package com.project.exe.common.specification;

import com.project.exe.common.entity.BaseEntity;
import org.springframework.data.jpa.domain.Specification;

public class BaseSpecification {

    public static <T extends BaseEntity> Specification<T> hasId(Long id) {
        return (root, query, cb) -> cb.equal(root.get("id"), id);
    }

    public static <T extends BaseEntity> Specification<T> isActive(Boolean active) {
        return (root, query, cb) -> {
            try {
                return cb.equal(root.get("active"), active);
            } catch (IllegalArgumentException e) {
                return cb.conjunction();
            }
        };
    }
}

