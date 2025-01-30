import React, { useEffect, useState } from 'react';
import Nav3 from '../Components/Nav3';
import ItemsByUser from '../Components/ItemsByUser';
import UpdateUser from '../Components/UpdateUser';
import { useLocation, useNavigate } from 'react-router-dom';


export default function UserProfile
({activeTab1}) {
   // const location = useLocation();
    const [user,setUser] = useState(null);
    const [activeTab,setActiveTab] = useState('profile');
    

    useEffect(()=>{
        const userString =  localStorage.getItem('user');
        if(userString)
            {
                setUser(JSON.parse(userString));
                setActiveTab(activeTab1);

            }

           /* if(location.state && location.state.activeTab)
              {
                setActiveTab(location.state.activeTab);

                
              }
                */

    },[activeTab1])

  return (
    <div>
        
        <Nav3/>
       
       
        

        <div class="mb-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-300 to-blue-700">
        <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
        
        
        <li class="me-2" role="presentation">
            <button
             class={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab=='profile'?'border-blue-600':'border-transparent'}`}
             id="profile-tab"               
             type="button" 
             role="tab" 
             aria-controls="profile" 
             aria-selected={activeTab==='profile'}
             onClick={()=>setActiveTab('profile')}>
             Profile
             </button>             
        </li>


        <li class="me-2" role="presentation">
        <button
             class={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab=='settings'?'border-blue-600':'border-transparent'}`}
             id="settings-tab"               
             type="button" 
             role="tab" 
             aria-controls="settings" 
             aria-selected={activeTab==='settings'}
             onClick={()=>setActiveTab('settings')}>
             Settings
             </button>   </li>



        <li class="me-2" role="presentation">
        <button
             class={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab=='myads'?'border-blue-600':'border-transparent'}`}
             id="myads-tab"               
             type="button" 
             role="tab" 
             aria-controls="myads" 
             aria-selected={activeTab==='myads'}
             onClick={()=>setActiveTab('myads')}>
             My Ads
        </button>              
        </li>
      
        </ul>
        </div>


        <div id="default-tab-content">
        <div className={`p-4 rounded-lg dark:bg-gray-800 ${activeTab==='profile'?'block':'hidden'}`} id="profile" role="tabpanel" aria-labelledby="profile-tab" >
        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl"><span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Welcome </span> 
        {user && user.Name}.</h1>
        <p class="text-lg ml-8 mt-10 font-normal text-gray-500 lg:text-xl dark:text-gray-400">Maximize Your Reach, Multiply Your Sales.</p>
        
        </div>       
        <div className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab==='settings'?'block':'hidden'}`} id="settings" role="tabpanel" aria-labelledby="settings-tab" >
        { user && <UpdateUser user={user}/>}

        </div>
        <div className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab==='myads'?'block':'hidden'}`} id="myads" role="tabpanel" aria-labelledby="myads-tab" >
        { user && <ItemsByUser user={user}/>}
        </div>
        </div>




    </div>
  )
}
