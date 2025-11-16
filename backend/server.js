import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./src/config/db.js";
import { sessionMiddleware } from "./src/middleware/session.js";

import authRouter from "./src/routes/authRoutes.js";
import taskRouter from "./src/routes/taskRoutes.js";

const app = express(); 
app.use(express.json());

connectDB();

app.use(sessionMiddleware);

app.use('/api/auth',authRouter);
app.use('/api/task',taskRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{console.log(`Server running on PORT ${PORT}`)});