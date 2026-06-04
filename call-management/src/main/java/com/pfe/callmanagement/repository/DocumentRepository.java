package com.pfe.callmanagement.repository;

import com.pfe.callmanagement.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Document entity.
 */
@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    
    List<Document> findByApplication_ApplicationId(Long applicationId);

    List<Document> findByFileType(String fileType);
}
