package com.pfe.callmanagement.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pfe.callmanagement.config.FileStorageProperties;

@Service
public class FileStorageService {

    private final Path fileStorageLocation;

    @Autowired
    public FileStorageService(FileStorageProperties properties) {

        this.fileStorageLocation =
                Paths.get(properties.getUploadDir()).toAbsolutePath().normalize();

        try {
            Files.createDirectories(fileStorageLocation);
        } catch (IOException ex) {
            throw new RuntimeException("Could not create upload directory.");
        }
    }

    public String storeFile(MultipartFile file) {

        try {

            String originalName = file.getOriginalFilename();

            String extension = "";

            if (originalName != null && originalName.contains(".")) {
                extension = originalName.substring(originalName.lastIndexOf("."));
            }

            String newFileName = UUID.randomUUID() + extension;

            Path targetLocation = fileStorageLocation.resolve(newFileName);

            Files.copy(file.getInputStream(),
                    targetLocation,
                    StandardCopyOption.REPLACE_EXISTING);

            return newFileName;

        } catch (IOException ex) {
            throw new RuntimeException("Could not store file.");
        }
    }

    public Resource loadFile(String fileName) {

        try {

            Path filePath = fileStorageLocation.resolve(fileName).normalize();

            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                return resource;
            }

            throw new RuntimeException("File not found.");

        } catch (Exception ex) {
            throw new RuntimeException("File not found.");
        }
    }

    public void deleteFile(String fileName) {

        try {

            Path filePath = fileStorageLocation.resolve(fileName).normalize();

            Files.deleteIfExists(filePath);

        } catch (IOException ex) {
            throw new RuntimeException("Could not delete file.");
        }
    }
}