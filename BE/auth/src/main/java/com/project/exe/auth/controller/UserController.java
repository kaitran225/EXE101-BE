package com.project.exe.auth.controller;

import com.project.exe.common.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.exe.auth.entity.User;
import com.project.exe.auth.repository.UserRepository;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    @GetMapping("/me")
    public ApiResponse<Map<String, Object>> me(@AuthenticationPrincipal Jwt jwt) {
        String sub = jwt.getSubject();
        return userRepository.findByUserSso(sub)
            .map(this::toMeResponse)
            .map(ApiResponse::ok)
            .orElseGet(() -> ApiResponse.ok(Map.of("sub", sub, "email", jwt.getClaimAsString("email"))));
    }

    private Map<String, Object> toMeResponse(User u) {
        return Map.of(
            "userId", u.getUserId(),
            "userSso", u.getUserSso(),
            "email", u.getEmail(),
            "fullName", u.getFullName() != null ? u.getFullName() : "",
            "avatarUrl", u.getAvatarUrl() != null ? u.getAvatarUrl() : "",
            "status", u.getStatus() != null ? u.getStatus() : "ACTIVE"
        );
    }
}
