import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import { useParams } from 'react-router-dom';
import ItemUpdate from '../Pages/ItemUpdate';

export default function ItemsByUser
({user}) {

   
    // const [user,setUser] = useState(null);
    const [items,setItems] = useState([]);
    const [error,setError] = useState(null);
    const [update,setUpdate] = useState(false);
    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_BASE_URL;

    useEffect(()=>{
        if(user)
            {
                // console.log(user);
                getItems(user);
            }

    },[user]); 

   

 const getItems = async(user)=>{
    
    try
    {
        // const response = await axios.get("http://localhost:8080/itemsByUserID/"+user.Id);
        const response = await axios.get(`${baseURL}/itemsByUserID/`+user.Id);
        setItems(response.data);
        console.log(user);


    }
    catch(err)
    {
            console.log(err);
            setError(err);
    };

   
    

    
};


    const deleteItem = async(Id)=>{
       try{
        // const response = await axios.delete(`http://localhost:8080/item/`+Id);
        const response = await axios.delete(`${baseURL}/item/`+Id);
        console.log(response);
        alert("Successfully deleted");
        getItems(user);


       }
       catch(err)
       {
          console.log(err);
          setError(err);
          alert("Error in deleting item");
          navigate(0);
       };
       
       
       
    };

    const updateItem = (item)=>{

        
        navigate(`/ItemUpdate/${item.id}`,{state:{item}});

    };

  return (
    <div>
        
        <Badge  className='mb-4 ml-5 bg-gradient-to-r from-green-300 to-blue-700' bg="secondary"><h6 className='mt-1'>My ads</h6></Badge>

        {
        items.length===0 ? (
            
             <figure class="flex flex-column items-center">
             
             <img class="rounded-l h-25 w-25" src="box_11951545.png" alt="image description"/>
                

            <figcaption class="  px-4 text-lg text-black bottom-6">
                    <p>No results found!</p>
            </figcaption>
                </figure>

        ):(


         <Row xs={2} md={4} className="g-4 ">
      {items.map(item => (
        <Col key={item.id}>
        <div class="w-full ml-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                
                {/* update seen ek */}
                
                <Link to={`/item/${item.id}`}>
                {/* <img className="p-8 rounded-t-lg product-image" src={`http://localhost:8080${item.imageUrl}`} alt="product" /> */}
                <img className="p-8 rounded-t-lg product-image" src={item.imageUrl} alt="product" />
                </Link>
            <div class="px-4 pb-4">
           
            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.brand}</h5>
            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.model}</h5>
            
            
      
        
        <div className='flex items-center location '>
        <span class="flex w-3 h-3 me-1 bg-green-500 rounded-full"></span>
        <h6 class="text-lg mt-1.5  dark:text-white">{item.location.district},{item.location.province}</h6>
        </div>



        <div className="priceCart">
            <span class="text-3xl font-bold text-gray-900 dark:text-white">Rs.{item.price}</span>
            
        </div>


        <div class="flex items-center justify-evenly mt-4 md:mt-6">
            <a  class=" cursor-pointer inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-100 bg-gradient-to-r from-green-300 to-blue-700 rounded-lg  hover:text-gray-900  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 no-underline" onClick={()=>updateItem(item)}>Update</a>
            <a  class=" cursor-pointer py-2 px-4 ms-2 text-sm font-medium text-gray-100 focus:outline-none bg-gradient-to-r from-green-300 to-blue-700 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 no-underline" onClick={()=>deleteItem(item.id)} >Delete</a>
            
       
        </div>













        
    </div>
    </div>
        </Col>
      ))}
    </Row>
        )
    }

      





    </div>
  )
}
