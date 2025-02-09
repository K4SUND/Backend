package com.example.demo.service;


import com.example.demo.dao.UserDAO;
import com.example.demo.model.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    UserDAO userDAO;
    PasswordEncoder passwordEncoder;


    @Autowired
    public UserServiceImpl(UserDAO userDAO, PasswordEncoder passwordEncoder) {
        this.userDAO = userDAO;
        this.passwordEncoder = passwordEncoder;
    }




    @Override
    @Transactional
    public String addUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userDAO.saveUser(user);
    }

    @Override
    public User getUserByID(int ID) {
        return userDAO.getUserByID(ID);
    }

    @Override
    public User findByEmailAndPass(String email, String pass) {

        pass = passwordEncoder.encode(pass);
        return userDAO.findByEmailAndPassword(email,pass);
    }

    @Override
    public User findByEmail(String email) {
        return userDAO.findByEmail(email);
    }
}
