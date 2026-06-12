package com.pfe.callmanagement.exception;

import java.time.LocalDateTime;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {

    private String errorCode;
    private String message;
    private int status;
    private LocalDateTime timestamp;
    private String path;
    private Map<String, String> errors;

    public ErrorResponse(
            String errorCode,
            String message,
            int status,
            LocalDateTime timestamp,
            String path) {

        this.errorCode = errorCode;
        this.message = message;
        this.status = status;
        this.timestamp = timestamp;
        this.path = path;
    }
}