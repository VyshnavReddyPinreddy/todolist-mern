import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import { toast } from "react-toastify";

import { assets } from '../assets/asset';


const Register = () => {

  const navigate = useNavigate();

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");
  const [showPassword,setShowPassword] = useState(false);

  const handleShowPassword = ()=>{
    setShowPassword(!showPassword);
  }

  const handleSignUp = async ()=>{

    if(!username || !password || !email){
      toast.error("Enter all fields");
      return;
    }

    if(password.length<8){
      toast.error("Password length must be atleast 8 characters");
      return;
    }

    try{

      const res = await registerUser({email,username,password});
      const data = res.data;

      toast.info(data.msg);

      navigate("/verify-email");
      
    }catch(error){
      const login = error.response?.data?.login;
      const verify = error.response?.data?.verify;
      const message = error.response?.data?.msg || "Something went wrong";

      toast.error(message);

      if(login===true){
        navigate("/");
      }else if(verify===true){
        navigate("/verify-email");
      }
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-100 p-4'>
      <div className='bg-white shadow-lg rounded-xl p-8 w-full max-w-md'>
        <h1 className='text-3xl font-bold text-center mb-6 text-blue-600'>Sign Up</h1>
        <div className='flex flex-col gap-4'>
          
          <div className='relative'>
            <img src={assets.email} alt='email icon'
                 className='w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 opacity-70'
            />
            <input
              type="email"
              placeholder='Enter Email'
              value = {email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-11 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
            />
          </div>

          <div className='relative'>
            <img src={assets.user} alt='email icon'
                  className='w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 opacity-70'
            />

            <input
              type="text"
              placeholder='Enter Username'
              value = {username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full px-11 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
            />
          </div>

          <div className='relative'>
            <img src={assets.password} alt='email icon'
              className='w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 opacity-70'
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder='Enter Password'
              value = {password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-11 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
            />

            <img src={showPassword ? assets.eyeOpen : assets.eyeClose} alt='email icon'
              onClick={handleShowPassword}
              className='w-5 h-5 absolute right-5 top-1/2 -translate-y-1/2 opacity-70 cursor-pointer'
            />
          </div>
          
          <button
            className='w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition'
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </div>
        <div className='text-center mt-4'>
          <button 
            className='text-blue-600 hover:underline'
            onClick={() => navigate("/")} 
          >
            Already have an account? Login Here
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register