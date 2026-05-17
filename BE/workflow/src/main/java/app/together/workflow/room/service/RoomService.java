package app.together.workflow.room.service;

import app.together.common.auth.enums.RoomRole;
import app.together.common.workflow.entity.Room;
import app.together.common.workflow.entity.RoomMember;
import app.together.common.workflow.enums.RoomStatus;
import app.together.common.workflow.repository.RoomMemberRepository;
import app.together.common.workflow.repository.RoomRepository;
import app.together.workflow.room.dto.RoomDtos.CreateRoomRequest;
import app.together.workflow.room.dto.RoomDtos.JoinRoomRequest;
import app.together.workflow.room.dto.RoomDtos.RoomEvent;
import app.together.workflow.room.dto.RoomDtos.RoomMemberResponse;
import app.together.workflow.room.dto.RoomDtos.RoomResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class RoomService {

    private final RoomRepository roomRepository;
    private final RoomMemberRepository roomMemberRepository;

    public RoomResponse createRoom(String userSso, CreateRoomRequest request) {
        Room room = Room.builder()
                .title(request.title())
                .description(request.description())
                .goalDescription(request.goalDescription())
                .goalDurationDays(request.goalDurationDays())
                .maxMembers(request.maxMembers())
                .isPremium(Boolean.TRUE.equals(request.isPremium()))
                .isPublic(Boolean.TRUE.equals(request.isPublic()))
                .inviteCode(generateInviteCode())
                .status(RoomStatus.OPEN.name())
                .activatedAt(Instant.now())
                .build();
        room = roomRepository.save(room);
        joinRoom(room.getRoomId(), userSso, new JoinRoomRequest(room.getInviteCode()));
        return toRoomResponse(room);
    }

    public RoomResponse joinRoom(Long roomId, String userSso, JoinRoomRequest request) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room not found"));
        if (room.getInviteCode() != null && request.inviteCode() != null && !room.getInviteCode().equals(request.inviteCode())) {
            throw new IllegalArgumentException("Invalid invite code");
        }
        RoomMember member = roomMemberRepository.findById(new app.together.common.workflow.entity.RoomMemberId(roomId, userSso))
                .orElseGet(() -> RoomMember.builder()
                        .roomId(roomId)
                        .userSso(userSso)
                        .joinedAt(Instant.now())
                        .build());
        member.setIsActive(true);
        member.setLastActiveAt(Instant.now());
        member.setRole(RoomRole.PARTICIPANT);
        roomMemberRepository.save(member);
        return toRoomResponse(room);
    }

    public RoomResponse getRoom(Long roomId) {
        return roomRepository.findById(roomId).map(this::toRoomResponse)
                .orElseThrow(() -> new IllegalArgumentException("Room not found"));
    }

    public RoomEvent buildEvent(Long roomId, String type, String actor, Object payload) {
        return new RoomEvent(String.valueOf(roomId), type, actor, Instant.now(), payload);
    }

    private RoomResponse toRoomResponse(Room room) {
        List<RoomMemberResponse> members = roomMemberRepository.findByRoomId(room.getRoomId()).stream()
                .map(member -> new RoomMemberResponse(member.getRoomId(), member.getUserSso(), member.getRole(), member.getIsActive(), member.getJoinedAt(), member.getLeftAt(), member.getLastActiveAt()))
                .toList();
        return new RoomResponse(room.getRoomId(), room.getTitle(), room.getDescription(), room.getInviteCode(), room.getStatus(), room.getIsPublic(), room.getIsPremium(), room.getMaxMembers(), room.getActivatedAt(), room.getExpiresAt(), room.getClosedAt(), members);
    }

    private String generateInviteCode() {
        return UUID.randomUUID().toString().replace("-", "").substring(0, 8).toUpperCase();
    }
}
