import React,{useState} from 'react'
import Navbar from '../components/Navbar'
import TaskCard from '../components/TaskCard'
import { useEffect } from 'react';
import { viewTasks,deleteTask,markTask } from '../services/api';
import { toast } from "react-toastify";
import { assets } from '../assets/asset';
import CreateTaskModal from '../components/CreateTaskModal';

const Dashboard = () => {
  const [loading,setLoading] = useState(true);
  const [tasks,setTasks] = useState([]);
  const [openModal,setOpenModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const loadTasks = async ()=> {
    try{
      const res = await viewTasks();
      setTasks(res.data.tasks);
    }catch(error){
      setTasks([]);
    }
  };

  useEffect(()=>{
    loadTasks();
    setLoading(false);
  },[]);

  const handleDelete = async (id)=>{
    try{
      const res = await deleteTask(id);
      toast.success(res.data.msg);

      loadTasks();

    }catch(error){
      const message = error.response?.data?.msg || "Something went wrong";
      toast.error(message);
    }
  }

  const handleToggle = async (id)=>{
    try{
      const res = await markTask(id);
      toast.success(res.data.msg);

      loadTasks();

    }catch(error){
      const message = error.response?.data?.msg || "Something went wrong";
      toast.error(message);
    }
  }

  const handleEdit = (task) => {
    setEditTask(task);       
    setOpenModal(true);   
  };

  const handleCreate = ()=>{
    setEditTask(null);
    setOpenModal(true);
  }

  if(loading) return <p className="text-center text-gray-600 mt-10">Loading...</p>

  return tasks.length===0 ? <p className="text-center text-gray-600 mt-10">Create some tasks</p>
                          : 
                          (
                            <>
                              <Navbar/>
                              <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                              {tasks.map(task=>(
                                        <TaskCard 
                                          key={task._id} 
                                          task={task} 
                                          onDelete={()=>handleDelete(task._id)} 
                                          onToggle={()=>handleToggle(task._id)}
                                          onEdit={()=>handleEdit(task)}
                                        />
                                        ))
                              }
                              </div>
                              <img src={assets.add} 
                                    className="fixed bottom-6 right-6 w-14 h-14
                                                hover:cursor-pointer
                                                flex items-center justify-center 
                                                transition-all duration-200"                                
                                    onClick={()=>setOpenModal(true)}          
                              />

                              {openModal && (
                                  <CreateTaskModal 
                                    onClose={() => setOpenModal(false)}
                                    onTaskCreated={loadTasks}
                                    task={editTask}
                                  />
                              )}

                            </>
                          );
}

export default Dashboard