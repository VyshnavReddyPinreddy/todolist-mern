import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required : true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    deadline:{
        type:Date,
        default:null
    },
    completed:{
        type:Boolean,
        default:false,
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    },
},{timestamps:true});

const taskModel = mongoose.models.task || mongoose.model("Task", taskSchema);

export default taskModel;