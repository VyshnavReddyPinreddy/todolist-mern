import Todo from "../models/Todo.js";

export const getTodos = async (request,response) =>{
    try{
        const todos = await Todo.find({userId:request.user._id});
        response.status(200).json(todos);
    }catch(err){
        response.status(500).json({ message: err.message });
    }
};

export const createTodo = async (request,response)=>{
    try{
        const {title,description,deadline} = request.body;
        const todo = await Todo.create({
            title,description,deadline,userId : request.user._id,
        }); 
        response.status(201).json(todo);
    }catch(err){
        response.status(500).json({ message: err.message });
    }
};

export const updateTodo = async (request,response)=>{
    try{
        const todo = await Todo.findOneAndUpdate(
            {_id: request.params.id,userId:request.user._id},
            request.body,
            {new:true}
        );
        if(!todo) return response.status(404).json({message:"Todo not found"});
        response.json(todo);
    }catch(err){
        response.status(500).json({ message: err.message });
    }
};

export const deleteTodo = async (request,response)=>{
    try{
        const todo = await Todo.findOneAndDelete(
            {_id: request.params.id,userId:request.user._id}
        );
        if(!todo) return response.status(404).json({message:"Todo not found"});
        response.json({message:"Todo removed"});
    }catch(err){
        response.status(500).json({ message: err.message });
    }
};



