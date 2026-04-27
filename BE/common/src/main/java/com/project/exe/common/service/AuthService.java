package com.project.exe.common.service;

import com.project.exe.common.constant.ErrorCodes;
import com.project.exe.common.constant.MessageConstants;
import com.project.exe.common.dto.UserDto;
import com.project.exe.common.dto.auth.ChangePasswordRequest;
import com.project.exe.common.dto.auth.LoginRequest;
import com.project.exe.common.dto.auth.LoginResponse;
import com.project.exe.common.dto.auth.RegisterRequest;
import com.project.exe.common.entity.PasswordReset;
import com.project.exe.common.entity.User;
import com.project.exe.common.enums.SubcriptionType;
import com.project.exe.common.enums.UserStatus;
import com.project.exe.common.exception.BadRequestException;
import com.project.exe.common.exception.ConflictException;
import com.project.exe.common.exception.ResourceNotFoundException;
import com.project.exe.common.exception.UnauthorizedException;
import com.project.exe.common.mapper.UserMapper;
import com.project.exe.common.repository.PasswordResetRepository;
import com.project.exe.common.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordResetRepository passwordResetRepository;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    @Transactional
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new UnauthorizedException("Invalid credentials", ErrorCodes.UNAUTHORIZED));

        if (user.getPasswordHash() == null || !passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new UnauthorizedException("Invalid credentials", ErrorCodes.UNAUTHORIZED);
        }

        return buildLoginResponse(user);
    }

    @Transactional
    public UserDto register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ConflictException("Email already exists", MessageConstants.MESSAGE_USER_EMAIL_ALREADY_EXISTS);
        }

        User user = User.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .userSso(generateUserSso())
                .planType(SubcriptionType.FREE.toString())
                .metadata("{}")
                .exp(0)
                .emailVerified(false)
                .status(UserStatus.ACTIVE.toString())
                .build();

        user = userRepository.save(user);
        return userMapper.toDto(user);
    }

    @Transactional
    public void logout(String refreshToken) {
        if (refreshToken != null && !refreshToken.isBlank()) {
            tokenService.revokeRefreshToken(refreshToken);
        }
    }

    @Transactional
    public LoginResponse refreshToken(String refreshToken) {
        User user = tokenService.validateRefreshToken(refreshToken)
                .orElseThrow(() -> new UnauthorizedException(
                        "Invalid or expired refresh token",
                        MessageConstants.MESSAGE_REFRESH_TOKEN_INVALID));

        tokenService.revokeRefreshToken(refreshToken);
        return buildLoginResponse(user);
    }

    @Transactional
    public void requestPasswordReset(String email) {
        // Always return success to prevent user enumeration
        userRepository.findByEmail(email).ifPresent(user -> {
            String rawToken = UUID.randomUUID().toString();
            String tokenHash = tokenService.hashToken(rawToken);

            PasswordReset reset = PasswordReset.builder()
                    .userId(user.getUserId())
                    .resetTokenHash(tokenHash)
                    .expiresAt(Instant.now().plusSeconds(3600))
                    .build();

            passwordResetRepository.save(reset);

            // TODO: send email with rawToken in production
        });
    }

    @Transactional
    public void confirmPasswordReset(ChangePasswordRequest request) {
        if (request == null || request.getToken() == null || request.getToken().isBlank()) {
            throw new BadRequestException(
                    "Reset token is required",
                    MessageConstants.MESSAGE_PASSWORD_RESET_INVALID);
        }
        if (request.getNewPassword() == null || request.getNewPassword().isBlank()) {
            throw new BadRequestException(
                    "New password is required",
                    MessageConstants.MESSAGE_PASSWORD_RESET_INVALID);
        }

        String tokenHash = tokenService.hashToken(request.getToken());
        PasswordReset reset = passwordResetRepository.findByResetTokenHash(tokenHash)
                .orElseThrow(() -> new BadRequestException(
                        "Invalid reset token",
                        MessageConstants.MESSAGE_PASSWORD_RESET_INVALID));

        if (reset.getUsedAt() != null) {
            throw new BadRequestException(
                    "Reset token already used",
                    MessageConstants.MESSAGE_PASSWORD_RESET_INVALID);
        }

        if (reset.getExpiresAt().isBefore(Instant.now())) {
            throw new BadRequestException(
                    "Reset token expired",
                    MessageConstants.MESSAGE_PASSWORD_RESET_EXPIRED);
        }

        User user = userRepository.findById(reset.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found",
                        MessageConstants.MESSAGE_USER_NOT_FOUND));

        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        reset.setUsedAt(Instant.now());
        passwordResetRepository.save(reset);

        tokenService.revokeAllUserRefreshTokens(user.getUserId());
    }

    @Transactional(readOnly = true)
    public UserDto getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "User not found with email: " + email,
                        MessageConstants.MESSAGE_USER_NOT_FOUND));
        return userMapper.toDto(user);
    }

    private LoginResponse buildLoginResponse(User user) {
        String accessToken = tokenService.generateAccessToken(user);
        String refreshToken = tokenService.generateRefreshToken(user);

        LoginResponse response = new LoginResponse();
        response.setAccessToken(accessToken);
        response.setRefreshToken(refreshToken);
        response.setTokenType("Bearer");
        response.setExpiresIn(3600L);
        response.setRefreshTokenExpiresIn(604800L);

        response.setPlan_type(user.getPlanType());
        response.setExp(user.getExp());
        return response;
    }

    private String generateUserSso(){
        return "USER_" + UUID.randomUUID().toString().substring(0 ,8).toUpperCase();
    }
}
