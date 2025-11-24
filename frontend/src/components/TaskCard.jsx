import React from 'react'

const TaskCard = ({task,onEdit,onDelete,onToggle}) => {

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      });
  };

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  const priorityColors = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700"
  };

  return (
    <div className='border p-4 rounded-lg shadow-md m-4 bg-white'>
      <div className='flex justify-between items-center'>
        <h2 className='text-lg font-semibold'>
          {task.title}
        </h2>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          className="
            w-5 h-6 cursor-pointer 
            accent-green-600 
            transition-all duration-200 
            hover:scale-110
          "
        />

      </div>

      {task.description && (
        <p className='text-gray-700 mt-2'>
          {task.description}
        </p>
      )}

      <div className='text-sm text-gray-600 mt-3'>
          <p>
            Deadline: <span className='font-medium'>{formatDate(task.deadline)}, {formatTime(task.deadline)}</span>
          </p>
      </div>

      <div className="flex justify-between items-center mt-4">

        <span
          className={`px-3 py-1 rounded font-semibold ${priorityColors[task.priority]}`}
        >
          {task.priority.toUpperCase()}
        </span>

        <div className="flex gap-4">
          <button 
            className="px-3 py-1 rounded bg-blue-500 text-white transition-all duration-200  hover:bg-blue-600 hover:cursor-pointer hover:scale-105"
            onClick={onEdit}
          >
            Edit
          </button>

          <button
            className="px-3 py-1 rounded bg-red-500 text-white transition-all duration-200  hover:bg-red-600 hover:cursor-pointer hover:scale-105"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>

      </div>

    </div>
  );
};

export default TaskCard;