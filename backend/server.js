import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./src/config/db.js";
import authRouter from "./src/routes/authRoutes.js";
import { sessionMiddleware } from "./src/middleware/session.js";

const app = express(); 
app.use(express.json());

connectDB();

app.use(sessionMiddleware);

app.use('/api/auth',authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{console.log(`Server running on PORT ${PORT}`)});