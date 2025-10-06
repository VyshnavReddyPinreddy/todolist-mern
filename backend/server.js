import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth",authRoutes);
app.use("/api/todos",todoRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server running on PORT ${PORT}`));