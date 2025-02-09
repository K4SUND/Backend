package com.example.demo.rest;


import com.example.demo.model.User;
import com.example.demo.service.JwtService;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    private UserService user ;
    private JwtService jwtService;


    @Autowired
    public UserController(UserService user, JwtService jwtService) {
        this.user = user;
        this.jwtService = jwtService;
    }




    @PostMapping("/user")
    public ResponseEntity<String> addUser(@RequestBody User user1)
    {
        return new ResponseEntity<>(user.addUser(user1), HttpStatus.CREATED);

    }


    @GetMapping("/user/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email )
    {
        return new ResponseEntity<>(user.findByEmail(email),HttpStatus.OK);
    }



    @GetMapping ("/user/{Id}")
        public ResponseEntity<User> getUserByID(@PathVariable int  Id)
        {
            return new ResponseEntity<>(user.getUserByID(Id),HttpStatus.OK);
        }

    @PutMapping("/user")
    public ResponseEntity<String> updateUser(@RequestBody User user1)
    {

        String password = user1.getPassword();
        String success = user.addUser(user1);
        String email = user1.getEmail();


        String generateToken = jwtService.generateToken(email,password);



        return new ResponseEntity<>(generateToken,HttpStatus.OK);
    }




}
