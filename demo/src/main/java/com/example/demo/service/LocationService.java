package com.example.demo.service;

import com.example.demo.model.Location;

public interface LocationService {

    Location getLocationById(int id);
    int getLocationId(String province,String district);

}
