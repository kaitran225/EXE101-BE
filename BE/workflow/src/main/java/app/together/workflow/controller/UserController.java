package app.together.workflow.controller;

import app.together.common.shared.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @PutMapping("/me/{id}")
    public ApiResponse<ResponseEntity<String>> updateUser(@PathVariable String id, @RequestBody(required = false) String body) {
        return ApiResponse.ok(ResponseEntity.ok("success"));
    }

    @DeleteMapping("/me/{id}")
    public ApiResponse<ResponseEntity<String>> deleteUser(@PathVariable String id) {

        return ApiResponse.ok(ResponseEntity.ok("success"));
    }
}
