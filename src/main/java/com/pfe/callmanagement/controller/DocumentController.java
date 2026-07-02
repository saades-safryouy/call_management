package com.pfe.callmanagement.controller;

import java.util.List;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pfe.callmanagement.dto.DocumentDTO;
import com.pfe.callmanagement.service.DocumentService;
import com.pfe.callmanagement.service.FileStorageService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Controller for document management endpoints.
 */
@RestController
@RequestMapping("/documents")
@RequiredArgsConstructor
@Tag(name = "Documents", description = "Document management endpoints")
public class DocumentController {

    private final DocumentService documentService;
    private final FileStorageService fileStorageService;
    /**
     * Upload document
     */
    @PostMapping("/upload")
    @PreAuthorize("hasAnyRole('ADMIN','HR','CANDIDATE')")
    @Operation(summary = "Upload document")
    public ResponseEntity<DocumentDTO> uploadDocument(
           @RequestParam("file") MultipartFile file,
           @RequestParam("applicationId") Long applicationId) {

       return ResponseEntity.status(HttpStatus.CREATED)
               .body(documentService.uploadDocument(file, applicationId));
    }

    /**
     * Download document
     */
   @GetMapping("/download/{fileName}")
    @PreAuthorize("hasAnyRole('ADMIN','HR','MANAGER','EVALUATOR','CANDIDATE')")
    @Operation(summary = "Download document")
    public ResponseEntity<Resource> downloadFile(
            @PathVariable String fileName) {

            Resource resource = fileStorageService.loadFile(fileName);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
}

    /**
     * Get document by ID
     */
    @GetMapping("/{documentId}")
    @Operation(summary = "Get document by ID")
    public ResponseEntity<DocumentDTO> getDocumentById(
            @PathVariable Long documentId) {

        return ResponseEntity.ok(documentService.getDocumentById(documentId));
    }

    /**
     * Get documents by application
     */
    @GetMapping("/application/{applicationId}")
    @Operation(summary = "Get documents by application")
    public ResponseEntity<List<DocumentDTO>> getDocumentsByApplication(
            @PathVariable Long applicationId) {

        return ResponseEntity.ok(
                documentService.getDocumentsByApplication(applicationId));
    }

    /**
     * Get documents by type
     */
    @GetMapping("/type/{fileType}")
    @Operation(summary = "Get documents by file type")
    public ResponseEntity<List<DocumentDTO>> getDocumentsByFileType(
            @PathVariable String fileType) {

        return ResponseEntity.ok(
                documentService.getDocumentsByFileType(fileType));
    }

    /**
     * Delete document
     */
    @DeleteMapping("/{documentId}")
    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @Operation(summary = "Delete document")
    public ResponseEntity<Void> deleteDocument(
            @PathVariable Long documentId) {

        documentService.deleteDocument(documentId);
        return ResponseEntity.noContent().build();
    }
}