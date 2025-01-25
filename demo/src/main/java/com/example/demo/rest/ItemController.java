package com.example.demo.rest;


import com.example.demo.model.Item;
import com.example.demo.model.Location;
import com.example.demo.model.User;
import com.example.demo.service.FileStorageService;
import com.example.demo.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
public class ItemController {

   private ItemService itemService;
   private FileStorageService fileStorageService;


   @Autowired
    public ItemController(ItemService itemService, FileStorageService fileStorageService) {
        this.itemService = itemService;
        this.fileStorageService = fileStorageService;
    }


//    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/item/{id}")
    public ResponseEntity<Item>  getItemByID(@PathVariable int id)
    {
        return new ResponseEntity<>(itemService.getItemByID(id), HttpStatus.OK);
    }


//    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/items")
    public ResponseEntity<List<Item>> getAllItems()
    {
        return new ResponseEntity<>(itemService.getAllItems(),HttpStatus.OK);
    }
    @GetMapping("/itemsByUserID/{id}")
    public ResponseEntity<List<Item>> getItemsByUser(@PathVariable int id)
    {
        return new ResponseEntity<>(itemService.getItemsByUser(id),HttpStatus.OK);
    }

    @GetMapping("/itemsByLocationID/{id}")
    public ResponseEntity<List<Item>> getItemsByLocation(@PathVariable int id)
    {
       List<Item> itemList =  itemService.getItemsByLocation(id);

       if (itemList==null)
       {
           return new ResponseEntity<>(HttpStatus.NO_CONTENT);
       }
        return new ResponseEntity<>(itemList,HttpStatus.OK);
    }

    @PostMapping("/item")
    public ResponseEntity<String > addItem(@RequestParam("brand") String brand,
                                           @RequestParam("model") String model,
                                           @RequestParam("description") String description,
                                           @RequestParam("price") double price,
                                           @RequestParam("locationId") int locationId,
                                           @RequestParam("userId") int userId,
                                           @RequestParam("file") MultipartFile file)
    {

        String filename = fileStorageService.storeFile(file);

        Item item = new Item();
        item.setBrand(brand);
        item.setModel(model);
        item.setDescription(description);
        item.setPrice(price);
        item.setImageUrl(filename);
        item.setUser(new User(userId));
        item.setLocation(new Location(locationId));

        itemService.addItem(item);
        return new ResponseEntity<>("Item Added",HttpStatus.CREATED);



    }

    @DeleteMapping("/item/{id}")
    public ResponseEntity<String> deleleById(@PathVariable int id)
    {
        Item item = itemService.getItemByID(id);
        String imageUrl = item.getImageUrl();

        String fileName = imageUrl.substring(imageUrl.lastIndexOf("/")+1);
        fileStorageService.deleteFile(fileName);
        return new ResponseEntity<>(itemService.deleteById(id),HttpStatus.OK);
    }

    @PatchMapping("/Item")
    public ResponseEntity<String> updateByItemId(
                                             @RequestParam("Id") int id,
                                             @RequestParam(value = "brand", required = false) String brand,
                                             @RequestParam(value = "model",required = false) String model,
                                             @RequestParam(value = "description",required = false) String description,
                                             @RequestParam(value = "price", required=false) String price,
                                             @RequestParam(value = "locationId", required = false) String locationId,
                                             @RequestParam(value = "file",required = false) MultipartFile file)

    {
        //retrieve exist item
        Item item = itemService.getItemByID(id);

        if(brand!=null)
        {
            item.setBrand(brand);
        }
        if(model!=null)
        {
            item.setModel(model);
        }

        if(description!=null)
        {
            item.setDescription(description);
        }

        if(price != null)
        {
            double doublePrice = Double.parseDouble(price);
            item.setPrice(doublePrice);
        }


        //location Id exist everytime -> frontend
        if(locationId!=null)
        {
            int intLocationId = Integer.parseInt(locationId);
            item.setLocation(new Location(intLocationId));
        }

        if(file!=null)
        {
            String oldImageUrl = item.getImageUrl();
            String fileName = oldImageUrl.substring(oldImageUrl.lastIndexOf("/")+1);
            fileStorageService.deleteFile(fileName);




            String newFileName = fileStorageService.storeFile(file);
            item.setImageUrl(newFileName);
        }

        String response = itemService.updateItem(item);


        return new ResponseEntity<>(response,HttpStatus.OK);

    }









}
