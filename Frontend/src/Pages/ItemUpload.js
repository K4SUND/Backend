
import { upload } from '@testing-library/user-event/dist/upload';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Nav3 from '../Components/Nav3';
import { Navigate, useNavigate } from 'react-router-dom';


   



export default function ItemUpload() {

    const provinceNames = ["Northern","North Western","Western","North Central","Central","Sabaragamuwa","Eastern","Uva","Southern"];
    const districtNames = {
        
            "Northern":["Jaffna","Kilinochchi","Mannar","Mulathivu","Vavuniya"],
            "North Western" :["Puttalam","Kurunagala"],
            "North Central" :["Pollonaruwa","Anuradhapura"],
            "Western":["Gampaha","Colombo","Kaluthara"],
            "Central":["Matale","Kandy","Nuwara Eliya"],
            "Sabaragamuwa":["Kegalle","Ratnapura"],
            "Eastern":["Trincomalee","Batticaloa","Ampara"],
            "Uva":["Badulla","Monaragala"],
            "Southern":["Galle","Matara","Hambantota"]
    };
  
    
    
    const [province, setProvince] = useState(""); 
    const [district, setDistrict] = useState("");
    const [brand,setBrand] = useState('');
    const [model,setModel] = useState('');
    const [Description,setDescription] = useState(null);
    const [price,setPrice] = useState(null);
    const [imageUrl,setImageUrl] = useState('');
    const [userId,setUserId] = useState(null);
    const [locationId,setLocationId] = useState(null);
    const [user,setUser] = useState(null);
    const navigate = useNavigate();

    const baseURL  = process.env.REACT_APP_BASE_URL;

    //locationId eka ganna one

    useEffect(()=>{
        const userString = localStorage.getItem('user');
        if(userString)
          {
    
              const User = JSON.parse(userString);
              setUser(User);
              setUserId(User.Id);
              
          }
      },[])

    const handleSubmit = async(e)=>{
        e.preventDefault();
        // const response = await axios.get("http://localhost:8080/locationId",{
        const response = await axios.get(`${baseURL}/locationId`,{
            params:{
                province:province,
                district:district

            }

        });

        const newLocationId = response.data;
        
        setLocationId(newLocationId);
        uploadItem(newLocationId);
    


        

    }

    const uploadItem = async(location)=>{
        try{

            const formData = new FormData();
            formData.append("file",imageUrl);
            formData.append("brand",brand);
            formData.append("model",model);
            formData.append("description",Description);
            formData.append("price",price);
            formData.append("userId",userId);
            formData.append("locationId",location);

          
            
            // const response = await axios.post("http://localhost:8080/item",formData,{
            const response = await axios.post(`${baseURL}/item`,formData,{
               headers:{
                   'Content-Type':'multipart/form-data'
               }
                    
                
            });
            
            console.log(response);
            console.log(brand,model,Description,price,imageUrl,userId,locationId);
            alert("Item uploaded successfully");
            navigate('/ProfileAds');

            

        }
        catch(err)
        {
            console.log(err);
        };
    };

    

   

    


  return (

    
    <div>
        <Nav3/>
        <form onSubmit={handleSubmit} className='p-5'>

        <div class="grid gap-6  mb-6 md:grid-cols-2">
       
        <div>
            <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
            <input type="text" id="brand" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Apple" required value={brand} onChange={(e)=>setBrand(e.target.value)} />
        </div>
       
        <div>
            <label for="model" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Model</label>
            <input type="text" id="model" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Iphone 12" required value={model} onChange={(e)=>setModel(e.target.value)}/>
        </div>

        </div>
        


        
         <label for="countries" class="block mb-2   mt-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
            <select 
            id="countries" 
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={province}
            onChange={(e) => setProvince(e.target.value)}>

            <option selected>Province</option>
            {

                provinceNames.map((provinceValue, index) => (
                    <option key={index} value={provinceValue}>
                        {provinceValue}
                    </option>
                ))
            }
          
            </select>
        
       
         <label for="countries" class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
            <select 
            id="countries" 
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}>
            <option selected>District</option>
            
                        {province && districtNames[province] && districtNames[province].map((districtValue, index) => (
                            <option key={index} value={districtValue}>
                                {districtValue}
                            </option>
                        ))}
          
            </select>
        
        
      

        
        <label for="description" class="block mb-2  mt-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
        <textarea id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..." value={Description} onChange={(e)=>setDescription(e.target.value)}></textarea>

        
        
        <label for="price" class="block mb-2  mt-2 text-sm font-medium text-gray-900 dark:text-white">Price:</label>
        <input type="number" id="price" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Rs." required  value={price} onChange={(e)=>setPrice(e.target.value)}/>
       
                

        <div>
        
        <label class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload an image</label>
        <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" required  onChange={(e)=>setImageUrl(e.target.files[0])}/>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
        </div> 

        <button type="submit" class="text-gray-100 bg-gradient-to-r from-green-300 to-blue-700 hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Post ad</button>             

       </form>


            
    </div>
  )
}


//location Id eka retrieve kireema -> province, district