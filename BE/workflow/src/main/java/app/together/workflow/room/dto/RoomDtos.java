package app.together.workflow.room.dto;

import java.time.Instant;
import java.util.List;

import app.together.common.auth.enums.RoomRole;

public final class RoomDtos {

    private RoomDtos() {
    }

    public record RoomResponse(
            Long roomId,
            String title,
            String description,
            String inviteCode,
            String status,
            Boolean isPublic,
            Boolean isPremium,
            Integer maxMembers,
            Instant activatedAt,
            Instant expiresAt,
            Instant closedAt,
            List<RoomMemberResponse> members
    ) {
    }

    public record RoomMemberResponse(
            Long roomId,
            String userSso,
            RoomRole role,
            Boolean isActive,
            Instant joinedAt,
            Instant leftAt,
            Instant lastActiveAt
    ) {
    }

    public record CreateRoomRequest(
            String title,
            String description,
            String goalDescription,
            Integer goalDurationDays,
            Integer maxMembers,
            Boolean isPremium,
            Boolean isPublic
    ) {
    }

    public record JoinRoomRequest(String inviteCode) {
    }

    public record SignalMessage(
            String roomId,
            String fromUser,
            String toUser,
            String type,
            Object payload,
            Instant sentAt
    ) {
    }

    public record RoomEvent(
            String roomId,
            String type,
            String actor,
            Instant at,
            Object payload
    ) {
    }
}
