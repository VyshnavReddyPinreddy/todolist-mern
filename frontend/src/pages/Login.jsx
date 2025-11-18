import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { toast } from "react-toastify";
import { assets } from '../assets/asset';

const Login = () => {

  const navigate = useNavigate();

  const [input,setInput] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  
  const handleShowPassword = ()=>{
    setShowPassword(!showPassword);
  }

  const handleLogin = async ()=>{

    if(!input || !password){
      toast.error("Enter all fields");
      return;
    }

    try{

      const res = await loginUser({input,password});
      const data = res.data;

      if(data.verify===false){
        toast.warning("Please verify your email before logging in.");
        navigate("/verify-email");
        return;
      }

      if(data.verify === true) {
        toast.success("Logged in successfully!");
        navigate("/dashboard");
        return;
      }
      if (data.msg) {
        toast.info(data.msg);
      }
      
    }catch(error){
      const message = error.response?.data?.msg || "Something went wrong";
      toast.error(message);
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-10 p-4'>
      <div className='bg-white shadow-lg rounded-xl p-8 w-full max-w-md'>
        <h1 className='text-3xl font-bold text-center mb-6 text-blue-600'>Login</h1>
        <div className='flex flex-col gap-4'>

          <div className='relative'>
            <img src={assets.user} alt='email icon'
                  className='w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 opacity-70'
            />

            <input
              type="text"
              placeholder='Enter Username or Email'
              value = {input}
              onChange={(e) => setInput(e.target.value)}
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
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
        <div className='text-center mt-4'>
          <button 
            className='text-blue-600 hover:underline'
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </button>
        </div>
        <div className='text-center mt-4'>
          <button 
            className='text-blue-600 hover:underline'
            onClick={() => navigate("/register")} 
          >
            New User ? Register Here
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login