import React from 'react'
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import Sidebar from '../components/profile/Sidebar';
import MobileNav from '../components/profile/MobileNav';


const Profile = () => {
  const [Profile, setProfile] = useState({});
   
  const headers = {
    id: localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(()=>{
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3001/api/v1/user-info",
        {headers}
      );
      setProfile(response.data);
    };
    fetch();
  }, []);

  return (
    <div className='bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-screen py-8 gap-4'>
      {!Profile && (
        <div className='w-full h-[100%] flex items-center justify-center'>
          <Loader />
        </div>
          )}
      {Profile && (
      <>
      <div className='w-full md:w-1/6'>
      <Sidebar data={Profile} />
      <MobileNav />
      </div>
      <div className='w-full md:w-5/6'>
      <Outlet />
      </div>
      </>
      )
      } 
    </div>
  );
}

export default Profile;