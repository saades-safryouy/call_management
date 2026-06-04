package com.pfe.callmanagement.exception;

/**
 * Exception thrown when a resource already exists.
 */
public class DuplicateResourceException extends ApplicationException {

    public DuplicateResourceException(String message) {
        super(message, "DUPLICATE_RESOURCE");
    }

    public DuplicateResourceException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s already exists with %s : '%s'", resourceName, fieldName, fieldValue), "DUPLICATE_RESOURCE");
    }
}
