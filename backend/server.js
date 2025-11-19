import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import connectDB from "./src/config/db.js";
import { sessionMiddleware } from "./src/middleware/session.js";

import authRouter from "./src/routes/authRoutes.js";
import taskRouter from "./src/routes/taskRoutes.js";
import userRouter from "./src/routes/userRoutes.js";

const app = express(); 
app.use(express.json());
app.use(cors({origin: "http://localhost:5173",credentials:true,}));


connectDB();

app.use(sessionMiddleware);

app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.use('/api/task',taskRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{console.log(`Server running on PORT ${PORT}`)});