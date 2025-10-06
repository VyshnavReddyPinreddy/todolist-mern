// src/components/TodoItem.jsx
import React, { useState } from 'react';
import API from '../services/api';

const TodoItem = ({ todo, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: todo.title,
    description: todo.description,
    deadline: todo.deadline.split('T')[0],
  });

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await API.delete(`/todos/${todo._id}`);
        onDelete(todo._id);
      } catch (error) {
        console.error('Failed to delete todo:', error);
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/todos/${todo._id}`, editData);
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };
  
  const handleToggleComplete = async () => {
    try {
      await API.put(`/todos/${todo._id}`, { completed: !todo.completed });
      onUpdate();
    } catch (error) {
      console.error('Failed to toggle completion status:', error);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      {isEditing ? (
        <form onSubmit={handleUpdate} className='flex flex-col gap-4'>
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleInputChange}
            className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <textarea
            name="description"
            value={editData.description}
            onChange={handleInputChange}
            rows="3"
            className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none'
          />
          <input
            type="date"
            name="deadline"
            value={editData.deadline}
            onChange={handleInputChange}
            className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          <div className='flex gap-2'>
            <button 
              type="submit"
              className='flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-200 hover:cursor-pointer'
            >
              Save
            </button>
            <button 
              type="button" 
              onClick={() => setIsEditing(false)}
              className='flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-200 hover:cursor-pointer'
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className='flex items-start justify-between mb-3'>
            <h4 className={`text-lg font-semibold ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {todo.title}
            </h4>
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={handleToggleComplete}
              className='w-5 h-5 text-blue-600 cursor-pointer'
            />
          </div>
          <p className='text-gray-600 mb-2'>{todo.description || 'No description'}</p>
          <p className='text-sm text-gray-500 mb-4'>
            Deadline: {new Date(todo.deadline).toLocaleDateString()}
          </p>
          <div className='flex gap-2'>
            <button 
              onClick={() => setIsEditing(true)}
              className='flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200 hover:cursor-pointer'
            >
              Edit
            </button>
            <button 
              onClick={handleDelete}
              className='flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-200 hover:cursor-pointer'
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;