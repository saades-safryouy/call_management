package com.pfe.callmanagement.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pfe.callmanagement.dto.DocumentDTO;
import com.pfe.callmanagement.entity.Application;
import com.pfe.callmanagement.entity.Document;
import com.pfe.callmanagement.exception.ResourceNotFoundException;
import com.pfe.callmanagement.repository.ApplicationRepository;
import com.pfe.callmanagement.repository.DocumentRepository;

import lombok.RequiredArgsConstructor;

/**
 * Service for document management operations.
 */
@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final ApplicationRepository applicationRepository;
    private final FileStorageService fileStorageService;
    /**
     * Upload document
     */
    public DocumentDTO uploadDocument(MultipartFile file, Long applicationId) {

    Application application = applicationRepository.findById(applicationId)
            .orElseThrow(() ->
                new ResourceNotFoundException("Application", "id", applicationId));

    String storedFileName = fileStorageService.storeFile(file);

    Document document = new Document();

    document.setFileName(file.getOriginalFilename());

    document.setFileType(file.getContentType());

    document.setFilePath(storedFileName);

    document.setApplication(application);

    Document saved = documentRepository.save(document);

    return mapToDTO(saved);
}

    /**
     * Get all documents
     */
    public List<DocumentDTO> getAllDocuments() {
        return documentRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get document by ID
     */
    public DocumentDTO getDocumentById(Long documentId) {

        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Document", "id", documentId));

        return mapToDTO(document);
    }

    /**
     * Get documents by application
     */
    public List<DocumentDTO> getDocumentsByApplication(Long applicationId) {

        return documentRepository.findByApplication_ApplicationId(applicationId)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Get documents by file type
     */
    public List<DocumentDTO> getDocumentsByFileType(String fileType) {

        return documentRepository.findByFileType(fileType)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Delete document
     */
    public void deleteDocument(Long documentId) {

    Document document = documentRepository.findById(documentId)
            .orElseThrow(() ->
                    new ResourceNotFoundException("Document", "id", documentId));

    fileStorageService.deleteFile(document.getFilePath());

    documentRepository.delete(document);
}

    /**
     * Entity -> DTO
     */
    private DocumentDTO mapToDTO(Document document) {

        return new DocumentDTO(
                document.getDocumentId(),
                document.getFileName(),
                document.getFileType(),
                document.getFilePath(),
                document.getApplication().getApplicationId()
        );
    }
}