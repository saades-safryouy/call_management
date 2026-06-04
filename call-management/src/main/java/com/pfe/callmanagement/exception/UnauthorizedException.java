package com.pfe.callmanagement.exception;

/**
 * Exception thrown when authentication fails.
 */
public class UnauthorizedException extends ApplicationException {

    public UnauthorizedException(String message) {
        super(message, "UNAUTHORIZED");
    }
}
