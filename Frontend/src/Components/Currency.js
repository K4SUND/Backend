import React from 'react';
import './Currency.css';
import { useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Currency() {

    const [date,setDate] = useState(new Date().toLocaleDateString());
    const baseURL = process.env.REACT_APP_BASE_URL;
    

   //const date = new Date().toLocaleDateString();
   //method to call local host

   const getCurrency = async()=>
    {
        
        try{
            // const response = await axios.get("http://localhost:5000/convert",{
            //     params:{date}});
            const response = await axios.get(`${baseURL}/convert`,{
                params:{date}});

        }
        catch(err)
        {
            console.log(err);

        }
    }

  return (
    <div>

    <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-2 py-2">
                    Currency name
                </th>
                <th scope="col" class="px-2 py-2">
                    unit
                </th>
                <th scope="col" class="px-2 py-2">
                    amount
                </th>
                
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-2 py-2">
                    Silver
                </td>
                <td class="px-2 py-2">
                    Laptop
                </td>
               
            </tr>
           
        </tbody>
    </table>
    </div>

        
    <Dropdown className="dropdown">
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Target Currency
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu">
        <Dropdown.Item className="dropdown-item" href="#/action-1">Action</Dropdown.Item>        
      </Dropdown.Menu>
    </Dropdown>

       
    </div>
  )
}
