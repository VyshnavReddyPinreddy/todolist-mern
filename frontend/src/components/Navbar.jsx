import React,{useEffect, useState, useRef, useInsertionEffect} from 'react'
import { fetchUsername,logoutUser } from '../services/api';
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"

const Navbar = () => {

  const navigate = useNavigate();
  const [open,setOpen] = useState(false);
  const [username,setUsername] = useState("");

  const dropdownRef = useRef(null);

  const toggleDropdown = ()=>{
    setOpen(!open);
  }

  useEffect(()=>{
    function handleClickOutside(event){
      if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
        setOpen(false);
      }
    }
    document.addEventListener("mousedown",handleClickOutside);
    return ()=>{
      document.removeEventListener("mousedown",handleClickOutside);
    }
  },[]);

  useEffect(()=>{
    (
      async ()=>{
        try{
          const res = await fetchUsername();
          setUsername(res.data.username);
        }catch(error){
          toast.error(error.message);
        }
      }
    )();
  },[]);

  const handleLogout = async ()=>{
    try{
      await logoutUser();
      toast.success("Logged out Successfully");
      navigate("/");
    }catch(error){
      toast.error("Logout failed");
    }
  };

  return (
    <div className='w-full bg-gray-200 shadow-md p-4 flex justify-between items-center sticky top-0'>
      <h2 className="text-xl font-semibold text-gray-800">
        Hello <span className='text-blue-600'>{username}</span>!
      </h2>

      <div className='relative' ref={dropdownRef}>
        <div
          className='w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold cursor-pointer'
          onClick={toggleDropdown}
        >
          {username ? username.charAt(0).toUpperCase():"?"}
        </div>

        { open && (
          <div className='absolute right-0 mt-2 w-36 bg-white shadow-lg rounded-md overflow-hidden border'>
            <button
              className='w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-700 cursor-pointer'
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}

      </div>

    </div> 
  )
}

export default Navbar