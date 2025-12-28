package com.project.exe.common.service;

import com.project.exe.common.entity.BaseEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface BaseService<T extends BaseEntity> {

    Optional<T> findById(Long id);

    List<T> findAll();

    Page<T> findAll(Pageable pageable);

    T save(T entity);

    T update(T entity);

    void deleteById(Long id);

    boolean existsById(Long id);
}

