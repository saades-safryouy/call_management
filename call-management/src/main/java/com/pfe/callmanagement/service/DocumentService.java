package com.pfe.callmanagement.service;

import com.pfe.callmanagement.dto.DocumentDTO;
import com.pfe.callmanagement.entity.Application;
import com.pfe.callmanagement.entity.Document;
import com.pfe.callmanagement.exception.ResourceNotFoundException;
import com.pfe.callmanagement.repository.ApplicationRepository;
import com.pfe.callmanagement.repository.DocumentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for document management operations.
 */
@Service
@RequiredArgsConstructor
public class DocumentService {

    private final DocumentRepository documentRepository;
    private final ApplicationRepository applicationRepository;

    /**
     * Upload a document for an application
     */
    public DocumentDTO uploadDocument(DocumentDTO dto) {
        Application application = applicationRepository.findById(dto.getApplicationId())
            .orElseThrow(() -> new ResourceNotFoundException("Application", "id", dto.getApplicationId()));

        Document document = new Document();
        document.setFileName(dto.getFileName());
        document.setFileType(dto.getFileType());
        document.setFilePath(dto.getFilePath());
        document.setApplication(application);

        Document savedDoc = documentRepository.save(document);
        return mapToDTO(savedDoc);
    }

    /**
     * Get document by ID
     */
    public DocumentDTO getDocumentById(Long documentId) {
        Document doc = documentRepository.findById(documentId)
            .orElseThrow(() -> new ResourceNotFoundException("Document", "id", documentId));
        return mapToDTO(doc);
    }

    /**
     * Get documents for an application
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
        if (!documentRepository.existsById(documentId)) {
            throw new ResourceNotFoundException("Document", "id", documentId);
        }
        documentRepository.deleteById(documentId);
    }

    /**
     * Helper method to map entity to DTO
     */
    private DocumentDTO mapToDTO(Document doc) {
        return new DocumentDTO(
            doc.getDocumentId(),
            doc.getFileName(),
            doc.getFileType(),
            doc.getFilePath(),
            doc.getApplication().getApplicationId()
        );
    }
}
