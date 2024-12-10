package com.example.demo.dao;

import com.example.demo.model.User;

public interface UserDAO {

    String saveUser(User user);
    User  getUserByID(int ID);

    User findByEmailAndPassword (String email, String pass);

    User findByEmail(String email);



}
