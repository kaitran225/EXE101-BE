package app.together.workflow.room.controller;

import app.together.common.shared.dto.ApiResponse;
import app.together.workflow.room.dto.RoomDtos.CreateRoomRequest;
import app.together.workflow.room.dto.RoomDtos.JoinRoomRequest;
import app.together.workflow.room.dto.RoomDtos.RoomResponse;
import app.together.workflow.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/workflow/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping
    public ApiResponse<RoomResponse> createRoom(@RequestBody CreateRoomRequest request) {
        return ApiResponse.ok(roomService.createRoom("system", request));
    }

    @PostMapping("/{roomId}/join")
    public ApiResponse<RoomResponse> joinRoom(@PathVariable Long roomId, @RequestBody JoinRoomRequest request) {
        return ApiResponse.ok(roomService.joinRoom(roomId, "system", request));
    }

    @GetMapping("/{roomId}")
    public ApiResponse<RoomResponse> getRoom(@PathVariable Long roomId) {
        return ApiResponse.ok(roomService.getRoom(roomId));
    }
}
