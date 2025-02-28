import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Loader from '../Loader/Loader';



const Settings = () => {
  const [ProfileData, setProfileData] = useState();
  const [Value, setValue] = useState({address: ""})
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
   
  const change = (e) => {
    const {name, value} = e.target;
    setValue({...Value, [name]:value})
  }

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/user-info",
        { headers }
      );
      setProfileData(response.data);
      setValue({address: response.data.data})
    };
    fetch();
  }, []);
  const SubmitAddress = async () => {
     const response = await axios.put("http://localhost:3000/api/v1/update-address",Value, {headers});
     alert(response.data.data);
     
  }


  return <>
    {!ProfileData && (
      <div className='w-full h-[100%] flex items-center justify-center'>
        <Loader />
      </div>
        )}

    {ProfileData && ( <div className='text-white'>
      <h1>Settings</h1>
      <div className='flex gap-12'>
         <div className=''>
          <label htmlFor="">Username</label>
          <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
            {ProfileData.username}
          </p>
         </div>

         <div className=''>
          <label htmlFor="">Username</label>
          <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
            {ProfileData.username}
          </p>
         </div>

         <div className=''>
          <label htmlFor="">Email</label>
          <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
            {ProfileData.email}
          </p>
         </div>

         <div className=''>
          <label htmlFor="">Address</label>
           <textarea 
           rows="5"
           name="address" 
           className='p-2 rounded bg-zinc-800 mt-2 font-semibold'
           placeholder='address'
           value={Value.address}
           onChange={change} />
         </div>

         <div className='nt-4 flex justify-center'>
          <button 
          onChange={SubmitAddress}
          className='bg-yellow-300 text-zinc-300 font-semibold px-1 py-2 rounded hover:bg-yellow-600'>
            Update
          </button>
         </div>

      </div>
      
    </div> 
  )}

    
    </>
}

export default Settings;