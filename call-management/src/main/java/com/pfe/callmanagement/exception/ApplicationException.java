package com.pfe.callmanagement.exception;

/**
 * Base runtime exception for application-specific errors.
 */
public class ApplicationException extends RuntimeException {

    private final String errorCode;

    public ApplicationException(String message) {
        super(message);
        this.errorCode = "APP_ERROR";
    }

    public ApplicationException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public ApplicationException(String message, Throwable cause) {
        super(message, cause);
        this.errorCode = "APP_ERROR";
    }

    public String getErrorCode() {
        return errorCode;
    }
}
