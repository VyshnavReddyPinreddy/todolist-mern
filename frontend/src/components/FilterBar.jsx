import React, { useState } from 'react'

const FilterBar = ({onApply,onClear}) => {
  const [searchText,setSearchText] = useState("");
  const [completed,setCompleted] = useState([]);
  const [priority,setPriority] = useState([]);
  const [fromDate,setFromDate] = useState("");
  const [toDate,setToDate] = useState("");
  const [sortBy,setSortBy] = useState("deadline");
  const [order,setOrder] = useState("asc");

  const handleMultipleSelect = (e,setter) => {
    const values = Array.from(e.target.selectedOptions,(opt)=>opt.value);
    setter(values);
  }

  const handleApply = ()=>{
    const filters = {
      searchText,
      completed,
      priority,
      fromDate,
      toDate,
      sortBy,
      order,
    };
    onApply(filters);
  };

  const handleClear = () => {
    setSearchText("");
    setCompleted([]);
    setPriority([]);
    setFromDate("");
    setToDate("");
    setSortBy("deadline");
    setOrder("asc");
    onClear();
  };

  return (
    <>
      <div className="p-6">
        <input
          className="w-full md:w-1/2 lg:w-1/3 border border-gray-300 rounded-xl px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Search tasks..."
          value={searchText}
          onChange={(e)=>setSearchText(e.target.value)}
        />

        <div className="flex flex-wrap gap-6 mt-6 bg-white p-6 rounded-2xl shadow-md border border-gray-200">

          <div className="flex flex-col gap-2">
            <p className="font-semibold text-gray-700">completed</p>
            <select
              multiple
              value={completed}
              onChange={(e)=>handleMultipleSelect(e,setCompleted)}
              className="min-w-32 h-24 border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
            >
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-semibold text-gray-700">priority</p>
            <select
              value={priority}
              onChange={(e)=>handleMultipleSelect(e,setPriority)}
              multiple
              className="min-w-32 h-24 border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none shadow-sm"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-semibold text-gray-700">From</p>
            <input
              type="date"
              value={fromDate}
              onChange={(e)=>setFromDate(e.target.value)}
              className="border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-semibold text-gray-700">To</p>
            <input
              type="date"
              value={toDate}
              onChange={(e)=>setToDate(e.target.value)}
              className="border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div className="flex flex-col gap-2 min-w-28">
            <p className="font-semibold text-gray-700">Sort By</p>
            <select 
              value={sortBy}
              onChange={(e)=>setSortBy(e.target.value)}
              className="border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none">
              <option value="deadline">Deadline</option>
              <option value="createdAt">Created At</option>
              <option value="updatedAt">Updated At</option>
              <option value="title">Title</option>
              <option value="priority">Priority</option>
            </select>
          </div>

          <div className="flex flex-col gap-2 min-w-28">
            <p className="font-semibold text-gray-700">Order</p>
            <select 
              value={order}
              onChange={(e)=>setOrder(e.target.value)}
              className="border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none">
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          </div>

          <div className="flex items-end gap-4 mt-4">
            <button 
              onClick={handleApply}
              className="px-5 py-2 bg-green-600 hover:bg-green-800 text-white rounded-xl shadow-md font-semibold hover:cursor-pointer">
              Apply
            </button>
            <button 
              onClick={handleClear}
              className="px-5 py-2 bg-red-600 hover:bg-red-800 text-white rounded-xl shadow-md font-semibold hover:cursor-pointer">
              Clear
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default FilterBar