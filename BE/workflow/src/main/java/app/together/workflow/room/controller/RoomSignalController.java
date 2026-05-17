package app.together.workflow.room.controller;

import app.together.workflow.room.dto.RoomDtos.RoomEvent;
import app.together.workflow.room.dto.RoomDtos.SignalMessage;
import app.together.workflow.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class RoomSignalController {

    private final RoomService roomService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/room.signal")
    public void signal(@Payload SignalMessage message) {
        RoomEvent event = roomService.buildEvent(Long.valueOf(message.roomId()), "SIGNAL_" + message.type(), message.fromUser(), message.payload());
        if (message.toUser() != null && !message.toUser().isBlank()) {
            messagingTemplate.convertAndSendToUser(message.toUser(), "/queue/room-signals", event);
            return;
        }
        messagingTemplate.convertAndSend("/topic/rooms/" + message.roomId() + "/signals", event);
    }
}
