package com.example.demo.service;

import org.springframework.web.multipart.MultipartFile;

public interface FirebaseStorageService {

    public String uploadImage(MultipartFile file);
    public String deleteImage(String fileName);
}
