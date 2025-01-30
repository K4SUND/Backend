package com.example.demo.service;

import com.example.demo.model.Item;

import java.util.List;

public interface ItemService {

    String addItem(Item item);
    String updateItem(Item item);

    Item getItemByID(int id);

    String deleteById(int id);

    List<Item> getAllItems();

    List<Item> getItemsByUser(int id);
    List<Item> getItemsByLocation(int id);


}
