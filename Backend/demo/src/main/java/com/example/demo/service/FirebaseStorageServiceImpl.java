package com.example.demo.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Storage;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.StorageClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;


@Service
public class FirebaseStorageServiceImpl implements FirebaseStorageService {

//    private final Storage storage;
//
//
//    @Autowired
//    public FirebaseStorageServiceImpl(Storage storage) throws IOException {
//        FileInputStream serviceAccount = new FileInputStream("src/main/resources/serviceAccountKey.json");
//        FirebaseOptions options = new FirebaseOptions.Builder()
//                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
//                .build();
//
//        FirebaseApp.initializeApp(options);
//        this.storage = StorageClient.getInstance().bucket().getStorage();
//    }
    private final   StorageClient storageClient;



    @Autowired
    public FirebaseStorageServiceImpl(FirebaseApp firebaseApp) {
        this.storageClient = StorageClient.getInstance(firebaseApp);
    }

    @Override
    public String uploadImage(MultipartFile file) {
        try{
            String fileName = file.getOriginalFilename();
            Path tempFile = Files.createTempFile(fileName,".tmp");
            Files.write(tempFile,file.getBytes());


            Blob blob = storageClient.bucket().create(fileName, Files.readAllBytes(tempFile));
            return blob.getMediaLink();

        }
        catch (IOException e)
        {
            throw new RuntimeException("Error uploading file to Firebase",e);
        }
    }

    @Override
    public String deleteImage(String fileName) {
        storageClient.bucket().get(fileName).delete();
        return "File deleted successfully";
    }
}
