package com.project.exe.common.repository;

import com.project.exe.common.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    List<RefreshToken> findByUserId(Long userId);
}
