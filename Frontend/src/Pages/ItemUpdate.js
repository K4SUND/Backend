import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Nav3 from '../Components/Nav3';
import axios from 'axios';

export default function ItemUpdate
() {


    const location = useLocation();
    const navigate = useNavigate();
    const {item} = location.state || {};
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


    const [userId,setUserId] = useState(null);
    const [product,setProduct] = useState(null); 
    const [province, setProvince] = useState(""); 
    const [district, setDistrict] = useState("");
    const [brand,setBrand] = useState("");
    const [model,setModel] = useState("");
    const [Description,setDescription] = useState("");
    const [price,setPrice] = useState("");
    const [imageUrl,setImageUrl] = useState("");
    const [locationId,setLocationId] = useState("");
    const baseURL = process.env.REACT_APP_BASE_URL;
    


    useEffect(()=>{
        
        setProduct(item);
        setProvince(item.location.province);
        setDistrict(item.location.district);

        const userString = localStorage.getItem('user');
        if(userString)
      {

        const User = JSON.parse(userString);
        setUserId(User.Id);
      }
        // setProvince(item.location.province);
        // setDistrict(item.location.district);
        // setBrand(item.brand);
        // setModel(item.model);
        // setDescription(item.description);
        // setPrice(item.price);
        // setImageUrl(item.imageUrl);

      },[item]);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        
        // const response = await axios.get(`http://localhost:8080/locationId`,{
        const response = await axios.get(`${baseURL}/locationId`,{
            params:{
                province:province,
                district:district

            }

        });

        const newLocationId = response.data;
        
        setLocationId(newLocationId);
        uploadItem(newLocationId);
    


        

    };

    const uploadItem = async(location)=>{
        try{

            const formData = new FormData();
            formData.append("Id",item.id);

            if(imageUrl){formData.append("file",imageUrl);}
            if(brand){formData.append("brand",brand);}
            if(model){formData.append("model",model);}
            if(Description){formData.append("description",Description);}
            if(price){ formData.append("price",price);} 
            if(location){formData.append("locationId",location);}
            
            
            
            
           
            
            

          
            
            // const response = await axios.patch("http://localhost:8080/Item",formData,{
            const response = await axios.patch(`${baseURL}/Item`,formData,{
               headers:{
                   'Content-Type':'multipart/form-data'
               }
                    
                
            });
            
            console.log(response);
            console.log(price);
            alert("Succesfully updated");
            navigate("/Profile",{ state:{activeTab: 'myads'}});

            // console.log(brand,model,Description,price,imageUrl,userId,locationId,item.Id);
            
            

        }
        catch(err)
        {
            console.log(err);
            alert("Error in updating item");
            navigate("/Profile",{ state:{activeTab: 'myads'}});
        };
    };



    

    
 
 
    return (
    <div>

        <Nav3/>

        {/* {/* <ul>
            <li>{brand}</li>
            <li>{model}</li>
            <li>{Description}</li>
            <li>{price}</li>
            <li>{imageUrl}</li>
            <li>{province}</li>
            <li>{district}</li>
          
        </ul>
         */}
        <form onSubmit={handleSubmit} className='p-5'>

        <img class="h-auto max-w-lg mx-auto" src={item.imageUrl} alt="item"/>            

        <div class="grid gap-6 mb-6 md:grid-cols-2">
       
        <div>
            <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
            <input type="text" id="brand" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={item.brand}  value={brand} onChange={(e)=>setBrand(e.target.value)} />
        </div>
       
        <div>
            <label for="model" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Model</label>
            <input type="text" id="model" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={item.model} value={model} onChange={(e)=>setModel(e.target.value)}/>
        </div>

        </div>
        


        
         <label for="countries" class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
            <select 
            id="countries" 
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={province}
            onChange={(e) => setProvince(e.target.value)}>

            <option selected>{item.location.province}</option>
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
            <option selected>{item.location.district}</option>
            
                        {province && districtNames[province] && districtNames[province].map((districtValue, index) => (
                            <option key={index} value={districtValue}>
                                {districtValue}
                            </option>
                        ))}
          
            </select>
        
        
      

        
        <label for="description" class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
        <textarea id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={item.description} value={Description} onChange={(e)=>setDescription(e.target.value)}></textarea>

        
        
        <label for="price" class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white">Price:</label>
        <input type="number" id="price" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={item.price} value={price} onChange={(e)=>setPrice(e.target.value)}/>
       
                

        <div>
           
        
        <label class="block mb-2 mt-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Edit image</label>
        <input class=" mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" onChange={(e)=>setImageUrl(e.target.files[0])}/>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
         
        </div>

        <button type="submit" class="text-gray-100 bg-gradient-to-r from-green-300 to-blue-700  hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>             

       </form>

       <div>
      
        
       </div>





    </div>
  )
}
