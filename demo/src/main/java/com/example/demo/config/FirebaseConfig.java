package com.example.demo.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FirebaseConfig {

    @Bean
    FirebaseApp firebaseApp() throws IOException {
        ClassPathResource resource = new ClassPathResource("serviceAccountKey.json");
        InputStream serviceAccount = resource.getInputStream();

        FirebaseOptions options = FirebaseOptions.builder()
                .setProjectId("speedlk-bcd7d")
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setStorageBucket("speedlk-bcd7d.firebasestorage.app")
                .setDatabaseUrl("https://speedlk-bcd7d-default-rtdb.firebaseio.com")
                .build();

        return FirebaseApp.initializeApp(options);
    }
}