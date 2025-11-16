import express from "express";
import { createTask,viewAllTasks,updateTask,markTask,deleteTask} from "../controllers/taskController.js";

const taskRouter = express.Router();

taskRouter.post('/',createTask);
taskRouter.get('/',viewAllTasks);

taskRouter.put('/:id',updateTask);
taskRouter.patch('/:id/complete',markTask);

taskRouter.delete('/:id',deleteTask);

export default taskRouter;