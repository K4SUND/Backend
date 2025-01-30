package com.example.demo.service;


import com.example.demo.dao.LocationDAO;
import com.example.demo.model.Location;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LocationServiceImpl implements LocationService{


    LocationDAO locationDAO;


    @Autowired
    public LocationServiceImpl(LocationDAO locationDAO) {
        this.locationDAO = locationDAO;
    }

    @Override
    public Location getLocationById(int id) {
        return locationDAO.getLocationByID(id);
    }

    @Override
    public int getLocationId(String province, String district) {
        return locationDAO.getLocationID(province,district);
    }
}
