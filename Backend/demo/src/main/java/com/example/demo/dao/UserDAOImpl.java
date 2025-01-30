package com.example.demo.dao;

import com.example.demo.model.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


@Repository
public class UserDAOImpl implements UserDAO{


    private EntityManager entityManager;

    @Autowired
    public UserDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public String saveUser(User user) {

       User savedUser = entityManager.merge(user);
       return "Registered";
    }

    @Override
    public User getUserByID(int ID) {
       User user =  entityManager.find(User.class,ID);
       return user;
    }

    @Override
    public User findByEmailAndPassword(String email, String pass) {

        TypedQuery<User> typedQuery = entityManager.createQuery(
                "SELECT u FROM User u  WHERE u.email=:email AND u.password=:pass",User.class
        );
        typedQuery.setParameter("email",email);
        typedQuery.setParameter("pass",pass);
        try{
            return typedQuery.getSingleResult();
        }catch (Exception e)
        {
            return null;
        }
    }

    @Override
    public User findByEmail(String email) {

        try{TypedQuery<User> typedQuery = entityManager.createQuery(
                "SELECT u FROM User u WHERE u.email = :email",User.class
        ).setParameter("email",email);


            User user = typedQuery.getSingleResult();
            return user;

        }
        catch (NoResultException e)
        {
            return null;
        }



    }


}
