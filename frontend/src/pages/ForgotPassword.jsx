import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { sendResetPasswordOtp } from '../services/api';
import { toast } from "react-toastify";
import { assets } from '../assets/asset';

const ForgotPassword = () => {

  const navigate = useNavigate();

  const [input,setInput] = useState("");

  const handleForgotPassword = async ()=>{

    if(!input){
      toast.error("Enter all fields");
      return;
    }

    try{

      const res = await sendResetPasswordOtp({input});
      const data = res.data;

      toast.success(data.msg);
      navigate('/reset-password');
      
    }catch(error){
      const message = error.response?.data?.msg || "Something went wrong";
      const verify = error.response?.data?.verify;
      toast.error(message);
      if(verify===true){
        navigate('/register');
        return;
      }
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-10 p-4'>
      <div className='bg-white shadow-lg rounded-xl p-8 w-full max-w-md'>
        <h1 className='text-3xl font-bold text-center mb-6 text-blue-600'>Forgot Password</h1>
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

          <button
            className='w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition'
            onClick={handleForgotPassword}
          >
            Request OTP
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

export default ForgotPassword