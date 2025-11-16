import userModel from "../models/User.js";
import taskModel from "../models/Task.js";

export const createTask = async (req,res)=>{
    const {title,description="",deadline,priority="medium"} = req.body;
    if(!title || !deadline){
        return res.status(400).json({msg:"Title and deadline are required"});
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

export const viewAllTasks = async (req,res)=>{
    const userId = req.session.userId;
    const {sort,order="desc",completed,priority} = req.query;

    try{
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(401).json({msg:"User not found"});
        }

        //base 

        const filter = {userId};

        // If completed filter exists: /tasks?completed=true

        if(completed!==undefined){
            filter.completed = completed==="true";
        }

        // PRIORITY FILTER
        if (priority !== undefined) {
            const allowedPriorities = ["low", "medium", "high"];

            let priorities = [];

            // Case 1: multiple values using comma → "high,low"
            if (typeof priority === "string" && priority.includes(",")) {
                priorities = priority.split(",").map(p => p.trim());
            }

            // Case 2: multiple values as array → ["high", "low"]
            else if (Array.isArray(priority)) {
                priorities = priority.map(p => p.trim());
            }
            // Case 3: single value → "high"
            else {
                priorities = [priority];
            }

            // Validate all priorities
            for (const p of priorities) {
                if (!allowedPriorities.includes(p)) {
                    return res.status(400).json({ msg: "Invalid priority value" });
                }
            }

            // Apply filter
            filter.priority = { $in: priorities };
        }

        // SEARCH FILTER
        if (req.query.search) {
            const search = req.query.search.trim();

            const words = search.split(/\s+/);

            const regexArray = words.map(word => ({
                $or: [
                    { title: new RegExp(word, "i") },
                    { description: new RegExp(word, "i") }
                ]
            }));

            filter.$and = regexArray;
        }

        // DEADLINE RANGE FILTER
        const { from, to } = req.query;

        if (from || to) {
            filter.deadline = {};

            if (from) filter.deadline.$gte = new Date(from);
            if (to) filter.deadline.$lte = new Date(to);
        }

        const allowedSortFields = ["deadline", "createdAt", "updatedAt", "title", "priority"];

        if (sort && !allowedSortFields.includes(sort)) {
            return res.status(400).json({ msg: "Invalid sort field" });
        }

        const sortOptions = {};

        if(sort){
            sortOptions[sort] = order === "asc" ? 1 : -1;
        }else{
            sortOptions.createdAt = -1; // default
        }

        const tasks = await taskModel.find(filter).sort(sortOptions); // newest first
        
        return res.status(200).json({msg:"Tasks fetched successfully",tasks});
        
    }catch(error){
        res.status(500).json({msg:"Internal server error"});
    }
}

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

        return res.status(200).json({msg:"Task marked successfully"});
        
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