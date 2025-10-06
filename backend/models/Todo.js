import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // must have a title 
  },
  description: { 
    type: String,   // optional
  },
  deadline: {
    type: Date,     // use Date type for deadlines
    required : true,
  },
  completed: {
    type: Boolean,
    default: false, // default to false
  },
  userId : {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
});

export default mongoose.model("Todo", todoSchema);
