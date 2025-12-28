package com.project.exe.common.event;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
public abstract class BaseEvent {
    private String eventId;
    private LocalDateTime timestamp;
    private String source;

    protected BaseEvent() {
        this.eventId = UUID.randomUUID().toString();
        this.timestamp = LocalDateTime.now();
        this.source = this.getClass().getSimpleName();
    }
}

