package com.example.demo.service;

import com.example.demo.dao.UserDAO;
import com.example.demo.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Objects;


@Service
public class JwtSeviceImpl implements JwtService {


    UserDAO userDAO;
    PasswordEncoder passwordEncoder;

    final SecretKey key;


    @Autowired
    public JwtSeviceImpl(UserDAO userDAO, @Value("${jwt.secret}")String secret, PasswordEncoder passwordEncoder) {
        this.userDAO = userDAO;
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public String generateToken(String email,String password) {

        User user = userDAO.findByEmail(email);


        //user null
        if(user==null)
        {
            return "User not found";
        }

        String realPassword = user.getPassword();





        //authentication
        if(passwordEncoder.matches(password,realPassword))
        {
            //user authenticated
            //generate token  that include this user
            String token = Jwts.builder()
                    .setSubject(user.getEmail())
                    .claim("Id",user.getId())
                    .claim("Email",user.getEmail())
                    .claim("Name",user.getName())
                    .claim("PhoneNumber",user.getPhoneNumber())
                    .setIssuedAt(new Date())
                    .signWith(key,SignatureAlgorithm.HS256)
                    .compact();


            return token;



        }


        return "Invalid password";


    }


}
