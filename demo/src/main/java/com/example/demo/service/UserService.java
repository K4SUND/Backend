package com.example.demo.service;

import com.example.demo.model.User;

public interface UserService {

    String addUser(User user);
    User getUserByID(int ID);

    User findByEmailAndPass(String email,String pass);
    User findByEmail(String email);



}
