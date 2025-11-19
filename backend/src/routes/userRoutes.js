import express from "express";
import { fetchUserName } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get('/username',fetchUserName);

export default userRouter;
