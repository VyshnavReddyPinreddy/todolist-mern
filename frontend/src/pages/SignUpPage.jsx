// src/pages/SignupPage.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', email: '', general: '' });
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  // Clear previous errors
  setErrors({ username: '', email: '', general: '' });

  try {
    await signup(username, email, password);
  } catch (error) {
    // Handle error response from backend
    if (error.response && error.response.data) {
      const errorMessage = error.response.data.message || error.response.data.error;
      
      // Check if error is about duplicate username or email
      if (errorMessage.toLowerCase().includes('username')) {
        setErrors({ username: 'Username already exists', email: '', general: '' });
      } else if (errorMessage.toLowerCase().includes('email')) {
        setErrors({ username: '', email: 'Email already exists', general: '' });
      } else {
        // setErrors({ username: '', email: '', general: errorMessage });
      }
    } else {
      setErrors({ username: '', email: '', general: 'Signup failed. Please try again.' });
    }
  }
};

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold text-center mb-6 text-gray-800'>Sign Up</h2>
        
        {errors.general && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Username" 
              required 
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.username && (
              <p className='text-red-500 text-sm mt-1'>{errors.username}</p>
            )}
          </div>

          <div>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Email" 
              required 
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.email && (
              <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
            )}
          </div>

          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            required 
            className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />

          <button 
            type="submit"
            className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium hover:cursor-pointer'
          >
            Sign Up
          </button>
        </form>
        <p className='text-center mt-4 text-gray-600'>
          Already have an account? 
          <button 
            className='text-blue-500 hover:text-blue-700 ml-1 font-medium hover:cursor-pointer'
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;