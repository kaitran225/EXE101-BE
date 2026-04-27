package com.project.exe.common.service;

import com.project.exe.common.entity.User;
import com.project.exe.common.exception.ResourceNotFoundException;
import com.project.exe.common.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getUserByEmail(String email){
        return userRepository.findByEmail(email).orElseThrow(
                () -> new ResourceNotFoundException("User not found with email: " + email, "USER_NOT_FOUND"));
    }
}
