import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { authActions } from '../Store/auth';
import { useDispatch } from 'react-redux';

const LogIn = () => {

  const [Values, setValues] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Values.username === "" &&
        Values.password === "" 
      ) {
        alert("Please fill all fields");
      } else {
        const response  = axios.post("https://localhost:3000/api/v1/sign-in", Values);
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate('/profile')
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (

    <div className='h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center'>
     <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
     <p className='text-zinc-200 text-xl text-center font-semibold underline'>Log In </p>
     <div className='mt-4'>
      <div>
        <label htmlFor="" className='text-zinc-400'>Username</label>
        <input 
        type="text" 
        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' 
        placeholder='Enter your username'
        name='username'
        required
        value={Values.username}
        onChange={change}
        />
      </div>
      <div className='mt-4'>
        <label htmlFor="" className='text-zinc-400'>Password</label>
        <input 
        type="password" 
        className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' 
        placeholder='Enter your password'
        name='password'
        required 
        value={Values.password}
        onChange={change}
        />
      </div>
      <button
              // to="/SignUp"
              className="px-2 py-1 bg-green-700 rounded mt-4 w-full hover:bg-gray-900 hover:text-green-700 transition-all duration-300" onClick={submit}>
              Login
      </button>
     </div>
     </div>
    </div>
  )
}

export default LogIn;