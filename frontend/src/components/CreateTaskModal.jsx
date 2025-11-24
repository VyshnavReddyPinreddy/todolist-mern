import React, { useState, useEffect } from "react";
import { createTask,updateTask } from "../services/api";
import { toast } from "react-toastify";

const CreateTaskModal = ({ task, onClose, onTaskCreated }) => {

  const isEdit = Boolean(task);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");
  const [priority, setPriority] = useState("medium");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");

      const iso = new Date(task.deadline);
      const date = iso.toISOString().slice(0, 10);
      const time = iso.toISOString().slice(11, 16);

      setDeadlineDate(date);
      setDeadlineTime(time);
    }
  }, [task]);


  const handleCreate = async () => {
    if (!title || !deadlineDate || !deadlineTime) {
      toast.error("Please fill all fields");
      return;
    }

    const finalDeadline = new Date(`${deadlineDate}T${deadlineTime}`);

    const now = new Date();

    if(finalDeadline<=now){
      toast.error("Deadline cannot be in the past");
      return;
    }

    try {
      let res;

      if(isEdit){
        res = await updateTask(task._id, {
          title,
          description,
          deadline: finalDeadline,
          priority
        });
      }else{
        res = await createTask({
          title,
          description,
          deadline: finalDeadline,
          priority,
        });
      }
      toast.success(res.data.msg);
      onTaskCreated(); // refresh dashboard
      onClose();       // close modal
    } catch (error) {
      const message = error.response?.data?.msg || "Something went wrong";
      toast.error(message);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
          {isEdit ? "Update Task": "Create New Task"}
        </h2>

        <div className="mb-3">
          <label className="font-semibold">Title*</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded-lg mt-1 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="font-semibold">Description</label>
          <textarea
            className="w-full border px-3 py-2 rounded-lg mt-1 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Optional description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="flex gap-3 mb-3">
          <div className="flex-1">
            <label className="font-semibold">Deadline Date*</label>
            <input
              type="date"
              className="w-full border px-3 py-2 rounded-lg mt-1 outline-none focus:ring-2 focus:ring-blue-500"
              value={deadlineDate}
              onChange={(e) => setDeadlineDate(e.target.value)}
            />
          </div>

          <div className="flex-1">
            <label className="font-semibold">Deadline Time*</label>
            <input
              type="time"
              className="w-full border px-3 py-2 rounded-lg mt-1 outline-none focus:ring-2 focus:ring-blue-500"
              value={deadlineTime}
              onChange={(e) => setDeadlineTime(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="font-semibold">Priority*</label>
          <select
            className="w-full border px-3 py-2 rounded-lg mt-1 outline-none focus:ring-2 focus:ring-blue-500"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={handleCreate}
          >
            {isEdit ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
