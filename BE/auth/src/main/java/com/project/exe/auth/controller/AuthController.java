package com.project.exe.auth.controller;

import com.project.exe.common.constant.ErrorCodes;
import com.project.exe.common.dto.ApiResponse;
import com.project.exe.common.dto.UserDto;
import com.project.exe.common.dto.auth.*;
import com.project.exe.common.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import static com.project.exe.common.dto.ApiResponse.ok;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(ok(authService.login(request)));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserDto>> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(ok(authService.register(request)));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(@Valid @RequestBody RefreshTokenRequest request) {
        authService.logout(request.getRefreshToken());
        return ResponseEntity.ok(ok(null));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserDto>> me(JwtAuthenticationToken authentication) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.fail("Not authenticated", ErrorCodes.UNAUTHORIZED));
        }
        String userEmail = authentication.getToken().getSubject();
        System.out.println("userEmail: " + userEmail);
        System.out.println("Claims: " + authentication.getToken().getClaims().toString());

        UserDto user = authService.getCurrentUser(userEmail);
        return ResponseEntity.ok(ok(user));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<LoginResponse>> refresh(@Valid @RequestBody RefreshTokenRequest request) {
        return ResponseEntity.ok(ok(authService.refreshToken(request.getRefreshToken())));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> requestPasswordReset(@Valid @RequestBody ResetPasswordRequest request) {
        authService.requestPasswordReset(request.getEmail());
        return ResponseEntity.ok(ok(null));
    }

    @PostMapping("/reset-password/confirm")
    public ResponseEntity<ApiResponse<Void>> confirmPasswordReset(@Valid @RequestBody ChangePasswordRequest request) {
        authService.confirmPasswordReset(request);
        return ResponseEntity.ok(ok(null));
    }
}
