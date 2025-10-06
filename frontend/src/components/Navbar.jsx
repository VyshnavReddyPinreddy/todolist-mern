// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className='bg-white shadow-md'>
      <div className='max-w-4xl mx-auto px-4 py-4 flex justify-between items-center'>
        <div className='flex items-center gap-2'>
        {user && <span className='text-xl font-bold text-black-600'>Hey, {user.username}</span>}
        </div>
        <button 
          onClick={logout}
          className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200 hover:cursor-pointer'
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;