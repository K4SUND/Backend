package com.example.demo.dao;

import com.example.demo.model.Location;

public interface LocationDAO {

    Location getLocationByID(int id);
    int getLocationID(String province,String district);

}
