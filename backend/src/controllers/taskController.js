import userModel from "../models/User.js";
import taskModel from "../models/Task.js";

export const createTask = async (req,res)=>{
    const {title,description="",deadline,priority="medium"} = req.body;
    if(!title || !deadline){
        return res.status(400).json({msg:"Title and deadline are required"});
    }

    const selectedDeadline = new Date(deadline);
    const now = new Date();

    if (selectedDeadline <= now) {
        return res.status(400).json({ msg: "Deadline cannot be in the past" });
    }

    const userId = req.session.userId;
    try{
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(401).json({msg:"User not found"});
        }
        const task = await taskModel.create({userId,title,description,deadline,priority});
        
        return res.status(201).json({msg:"Task created"});
    }catch(error){
        res.status(500).json({msg:error.message});
    }
}

export const viewAllTasks = async (req, res) => {
  const userId = req.session.userId;

  const {
    searchText,
    fromDate,
    toDate,
    sortBy = "deadline",
    order = "asc",
  } = req.query;

  const toArray = (val) => {
    if (val === undefined || val === null) return [];
    if (Array.isArray(val)) return val;
    return [val];
  };

  // handle completed and priority from either `completed` or `completed[]`, `priority` or `priority[]`
  const rawCompleted = req.query.completed ?? req.query["completed[]"];
  const rawPriority  = req.query.priority  ?? req.query["priority[]"];

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }

    let query = { userId };

    // text search
    if (searchText && searchText.trim() !== "") {
      query.title = { $regex: searchText.trim(), $options: "i" };
    }

    // completed filter: UI sends "completed" / "incomplete"
    const completedArray = toArray(rawCompleted);
    if (completedArray.length > 0) {
      const completedBooleans = completedArray.map((v) => {
        if (v === "completed") return true;
        if (v === "incomplete") return false;
        // also handle other possible forms
        if (v === "true" || v === "1") return true;
        if (v === "false" || v === "0") return false;
        return null;
      }).filter((v) => v !== null);

      if (completedBooleans.length > 0) {
        query.completed = { $in: completedBooleans };
      }
    }

    // priority filter
    const priorityArray = toArray(rawPriority);
    if (priorityArray.length > 0) {
      query.priority = { $in: priorityArray };
    }

    // date range filter on deadline
    if (fromDate || toDate) {
      query.deadline = {};
      if (fromDate) query.deadline.$gte = new Date(fromDate);
      if (toDate)   query.deadline.$lte = new Date(toDate);
    }

    // sort
    const sortOrder = order === "asc" ? 1 : -1;
    const sortQuery = { [sortBy]: sortOrder };

    const tasks = await taskModel.find(query).sort(sortQuery);

    return res.status(200).json({ msg: "Tasks fetched successfully", tasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};



export const updateTask = async (req,res)=>{
    const {title,description,deadline,priority} = req.body;
    const userId = req.session.userId;
    const taskId = req.params.id;
    try{
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(401).json({msg:"User not found"});
        }

        const task = await taskModel.findOne({_id:taskId, userId});
        if(!task){
            return res.status(404).json({msg:"Task not found"});
        }
        
        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (deadline !== undefined) task.deadline = deadline;
        if (priority !== undefined) task.priority = priority;

        await task.save();

        return res.status(200).json({msg:"Task updated successfully"});
        
    }catch(error){
        res.status(500).json({msg:"Internal server error"});
    }
}

export const markTask = async (req,res)=>{
    const userId = req.session.userId;
    const taskId = req.params.id;
    try{
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(401).json({msg:"User not found"});
        }

        const task = await taskModel.findOne({_id:taskId, userId});
        if(!task){
            return res.status(404).json({msg:"Task not found"});
        }

        task.completed = !task.completed;

        await task.save();

        const message = task.completed
                        ? "Task marked successfully"
                        : "Task unmarked successfully";

        return res.status(200).json({ msg: message });
    }catch(error){
        res.status(500).json({msg:"Internal server error"});
    }
}

export const deleteTask = async (req,res)=>{
    const userId = req.session.userId;
    const taskId = req.params.id;
    try{
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(401).json({msg:"User not found"});
        }

        const task = await taskModel.findOneAndDelete({_id:taskId, userId});
        if(!task){
            return res.status(404).json({msg:"Task not found"});
        }

        return res.status(200).json({msg:"Task deleted successfully"});
        
    }catch(error){
        res.status(500).json({msg:"Internal server error"});
    }
}