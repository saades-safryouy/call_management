package com.pfe.callmanagement.controller;

import com.pfe.callmanagement.dto.DocumentDTO;
import com.pfe.callmanagement.service.DocumentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for document management endpoints.
 */
@RestController
@RequestMapping("/documents")
@RequiredArgsConstructor
@Tag(name = "Documents", description = "Document management endpoints")
public class DocumentController {

    private final DocumentService documentService;

    /**
     * Upload document endpoint
     */
    @PostMapping
    @Operation(summary = "Upload document", description = "Upload a document for an application")
    public ResponseEntity<DocumentDTO> uploadDocument(@Valid @RequestBody DocumentDTO dto) {
        DocumentDTO response = documentService.uploadDocument(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Get document by ID endpoint
     */
    @GetMapping("/{documentId}")
    @Operation(summary = "Get document by ID", description = "Retrieve document information by ID")
    public ResponseEntity<DocumentDTO> getDocumentById(@PathVariable Long documentId) {
        DocumentDTO response = documentService.getDocumentById(documentId);
        return ResponseEntity.ok(response);
    }

    /**
     * Get documents for application endpoint
     */
    @GetMapping("/application/{applicationId}")
    @Operation(summary = "Get documents by application", description = "Retrieve all documents for an application")
    public ResponseEntity<List<DocumentDTO>> getDocumentsByApplication(@PathVariable Long applicationId) {
        List<DocumentDTO> response = documentService.getDocumentsByApplication(applicationId);
        return ResponseEntity.ok(response);
    }

    /**
     * Get documents by file type endpoint
     */
    @GetMapping("/type/{fileType}")
    @Operation(summary = "Get documents by file type", description = "Retrieve documents filtered by file type")
    public ResponseEntity<List<DocumentDTO>> getDocumentsByFileType(@PathVariable String fileType) {
        List<DocumentDTO> response = documentService.getDocumentsByFileType(fileType);
        return ResponseEntity.ok(response);
    }

    /**
     * Delete document endpoint
     */
    @DeleteMapping("/{documentId}")
    @Operation(summary = "Delete document", description = "Delete a document")
    public ResponseEntity<Void> deleteDocument(@PathVariable Long documentId) {
        documentService.deleteDocument(documentId);
        return ResponseEntity.noContent().build();
    }
}
