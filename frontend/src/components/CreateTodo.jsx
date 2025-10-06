// src/components/CreateTodo.jsx
import React, { useState } from 'react';
import API from '../services/api';

const CreateTodo = ({ onTodoCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !deadline) {
      alert('Title and deadline are required!');
      return;
    }

    try {
      await API.post('/todos', { title, description, deadline });
      setTitle('');
      setDescription('');
      setDeadline('');
      onTodoCreated(); 
    } catch (error) {
      console.error('Failed to create todo:', error);
      alert('Failed to create task. Please try again.');
    }
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h3 className='text-xl font-semibold text-gray-800 mb-4'>Create New Task</h3>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <textarea
          placeholder="Task Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
          className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <button 
          type="submit"
          className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium hover:cursor-pointer'
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default CreateTodo;