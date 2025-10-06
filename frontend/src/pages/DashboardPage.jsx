// src/pages/DashboardPage.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TodoItem from '../components/TodoItem';
import CreateTodo from '../components/CreateTodo';
import API from '../services/api'; 

const DashboardPage = () => {
  const [todos, setTodos] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const fetchTodos = async () => {
    try {
      const { data } = await API.get('/todos');
      setTodos(data);
    } catch (error) {
      console.error('Could not fetch todos', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleTodoCreated = () => {
    fetchTodos();
    setShowCreateForm(false); // Close the form after creating a task
  };

  const handleTodoDeleted = (deletedTodoId) => {
    setTodos(todos.filter(todo => todo._id !== deletedTodoId));
  };
  
  const handleTodoUpdated = () => {
    fetchTodos();
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />
      <div className='max-w-4xl mx-auto px-4 py-8'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-3xl font-bold text-gray-800'>Your Tasks</h1>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className='bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 font-medium hover:cursor-pointer'
          >
            {showCreateForm ? 'Cancel' : '+ New Task'}
          </button>
        </div>

        {showCreateForm && (
          <div className='mb-6'>
            <CreateTodo onTodoCreated={handleTodoCreated} />
          </div>
        )}

        <div className='mt-6 space-y-4'>
          {todos.length === 0 ? (
            <p className='text-center text-gray-500 py-8'>No tasks yet. Create your first task above!</p>
          ) : (
            todos.map((todo) => (
              <TodoItem 
                key={todo._id} 
                todo={todo} 
                onDelete={handleTodoDeleted}
                onUpdate={handleTodoUpdated} 
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;