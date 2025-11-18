import express from "express";
import {register,verifyEmail,resendOtp,login,logout,sendResetPasswordOtp,resetPassword, checkAuth} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post('/register',register);
authRouter.post('/verify-email',verifyEmail);
authRouter.post('/resend-otp',resendOtp);

authRouter.post('/login',login);
authRouter.post('/logout',logout);

authRouter.post('/send-reset-password-otp',sendResetPasswordOtp);
authRouter.post('/reset-password',resetPassword);

authRouter.get('/check-auth',checkAuth);

export default authRouter;