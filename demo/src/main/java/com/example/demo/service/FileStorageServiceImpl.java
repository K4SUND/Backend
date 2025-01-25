package com.example.demo.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.IOException;
import java.util.UUID;

@Service
public class FileStorageServiceImpl implements FileStorageService{

//    @Value("${file.upload-dir}")
//    private String uploadDir;

//    private final S3Client s3Client;
//    private final String bucketName;

    private final GridFsTemplate gridFsTemplate;

//    @Autowired
//    public FileStorageServiceImpl(@Value("${aws.s3.bucket-name}") String bucketName,
//                                  @Value("${aws.s3.region}") String region,
//                                  @Value("${aws.s3.access-key-id}") String accessKeyId,
//                                  @Value("${aws.s3.secret-access-key}") String secretAccessKey)
//    {
//        this.bucketName = bucketName;
//        this.s3Client = S3Client.builder()
//                .region(Region.of(region))
//                .credentialsProvider(StaticCredentialsProvider.create(AwsBasicCredentials.create(accessKeyId,secretAccessKey)))
//                .build();
//
//
//
//    }


    @Autowired
    public FileStorageServiceImpl(GridFsTemplate gridFsTemplate) {
        this.gridFsTemplate = gridFsTemplate;
    }

//    @Override
//    public String storeFile(MultipartFile file)
//    {
//        String fileName = UUID.randomUUID().toString() +"_" + file.getOriginalFilename();
//        try{
//            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
//                    .bucket(bucketName)
//                    .key(fileName)
//                    .build();
//
//            s3Client.putObject(putObjectRequest,
//            RequestBody.fromBytes(file.getBytes()));
//
//            return fileName;
//        }
//        catch ( S3Exception | IOException e)
//        {
//            throw new RuntimeException("Could not store file: "+fileName,e);
//
//        }
//    }




//    @Override
//    public void deleteFile(String fileName)
//    {
//        try{
//            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
//                    .bucket(bucketName)
//                    .key(fileName)
//                    .build();
//
//            s3Client.deleteObject(deleteObjectRequest);
//        }
//        catch (S3Exception e){
//            throw new RuntimeException("Could not delete file: "+fileName,e);
//        }
//    }
//

    /*
    @Override
    @Transactional
    public String storeFile(MultipartFile file) {
        String fileName = UUID.randomUUID().toString()+"_"+file.getOriginalFilename();
        try{

            Path dirPath = Paths.get(uploadDir);
            if(!Files.exists(dirPath))
            {
                Files.createDirectories(dirPath);
            }
            Path filePath = dirPath.resolve(fileName);
            Files.copy(file.getInputStream(),filePath);
            return fileName;

        }
        catch (IOException e)
        {
            throw new RuntimeException("Could not store file"+fileName,e);
        }

    }


    @Override
    @Transactional
    public void deleteFile(String fileName) {
        try{
            Path filePath = Paths.get(uploadDir).resolve(fileName).normalize();
            Files.deleteIfExists(filePath);

        }
        catch (IOException e)
        {
            throw new RuntimeException("Could not delete file"+fileName,e);

        }
    }

    */


    @Override
    public String storeFile(MultipartFile file) {
        try{



            return gridFsTemplate.store(file.getInputStream(),file.getOriginalFilename(),file.getContentType()).toString();

        }
        catch(IOException e){

            throw new RuntimeException("Could not store file: "+file.getOriginalFilename(),e);

        }
    }

    @Override
    public void deleteFile(String fileName) {

        try{
            gridFsTemplate.delete(new Query(Criteria.where("_id").is(fileName)));
        }
        catch(Exception e)
        {
            throw new RuntimeException("Could not delete file: " + fileName,e);

        }
    }
}
