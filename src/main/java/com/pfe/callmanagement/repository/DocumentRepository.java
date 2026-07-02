package com.pfe.callmanagement.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pfe.callmanagement.entity.Document;

/**
 * Repository interface for Document entity.
 */
@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {

    List<Document> findByApplication_ApplicationId(Long applicationId);

    List<Document> findByFileType(String fileType);
}