import express from "express";

const taskRouter = express.Router();

taskRouter.post('/',createTask);
taskRouter.get('/',viewAllTasks);

taskRouter.put('/:id',updateTask);
taskRouter.patch('/:id/complete',markTask);

taskRouter.delete('/:id',deleteTask);

export default taskRouter;