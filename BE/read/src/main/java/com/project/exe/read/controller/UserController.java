package com.project.exe.read.controller;

import com.project.exe.common.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @GetMapping("/my-data")
    public ApiResponse<ResponseEntity<String>> getData(JwtAuthenticationToken authentication){
        String email = authentication.getToken().getSubject();

        Object userIdObj = authentication.getToken().getClaims().get("user_id");
        String userSso = (String) authentication.getToken().getClaims().get("user_sso");

        String data = "Data for user" + email + ", " + userIdObj + ", " + userSso;

        System.out.println("check thanh cong");
        return ApiResponse.ok(ResponseEntity.ok(data));
    }
}
