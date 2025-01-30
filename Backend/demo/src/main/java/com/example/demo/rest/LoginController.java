package com.example.demo.rest;


import com.example.demo.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class LoginController {

     private JwtService jwt;


     @Autowired
     public LoginController(JwtService jwt) {
            this.jwt = jwt;

     }

    @GetMapping("/login")
    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password)
    {
        return new ResponseEntity<>(jwt.generateToken(email,password),HttpStatus.ACCEPTED);


    }



}
