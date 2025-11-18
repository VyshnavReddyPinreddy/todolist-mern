import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/api';
import { toast } from "react-toastify";
import { assets } from '../assets/asset';

const ResetPassword = () => {

  const navigate = useNavigate();

  const [otp,setOtp] = useState("");
  const [showOtp,setshowOtp] = useState(false);
  const [newPassword,setNewPassword] = useState("");
  const [showNewPassword,setShowNewPassword] = useState(false);
    
  const handleShowNewPassword = ()=>{
    setShowNewPassword(!showNewPassword);
  }
  
  const handleShowOtp = ()=>{
    setshowOtp(!showOtp);
  }

  const handleResetPassword = async ()=>{

    if(!otp || !newPassword){
      toast.error("Enter all fields");
      return;
    }

    if(newPassword.length<8){
      toast.error("Password length must be atleast 8 characters");
      return;
    }

    try{

      const res = await resetPassword({otp,newPassword});
      const data = res.data;

      toast.success(data.msg);
      navigate('/');
      
    }catch(error){
      const message = error.response?.data?.msg || "Something went wrong";
      const sessionExpired = error.response?.data?.sessionExpired;
      const otpExpired = error.response?.data?.otpExpired;
      toast.error(message);
      if(sessionExpired===true || otpExpired===true){
        navigate('/forgot-password');
        return;
      }
      setOtp("");
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-100 p-4'>
      <div className='bg-white shadow-lg rounded-xl p-8 w-full max-w-md'>
        <h1 className='text-3xl font-bold text-center mb-6 text-blue-600'>Reset Password</h1>
        <div className='flex flex-col gap-4'>

          <div className='relative'>
            <img src={assets.otp} alt='otp icon'
              className='w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 opacity-70'
            />

            <input
              type={showOtp ? "text" : "password"}
              placeholder='Enter OTP'
              value = {otp}
              onChange={(e) => setOtp(e.target.value)}
              className='w-full px-11 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
            />

            <img src={showOtp ? assets.eyeOpen : assets.eyeClose} alt='otp icon'
              onClick={handleShowOtp}
              className='w-5 h-5 absolute right-5 top-1/2 -translate-y-1/2 opacity-70 cursor-pointer'
            />
          </div>

          <div className='relative'>
            <img src={assets.password} alt='email icon'
              className='w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 opacity-70'
            />

            <input
              type={showNewPassword ? "text" : "password"}
              placeholder='Enter New Password'
              value = {newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className='w-full px-11 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none'
            />

            <img src={showNewPassword ? assets.eyeOpen : assets.eyeClose} alt='email icon'
              onClick={handleShowNewPassword}
              className='w-5 h-5 absolute right-5 top-1/2 -translate-y-1/2 opacity-70 cursor-pointer'
            />
          </div>
          
          <button
            className='w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition'
            onClick={handleResetPassword}
          >
            Reset Password
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

export default ResetPassword