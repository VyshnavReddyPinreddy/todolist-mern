import userModel from "../models/User.js";
import bcrypt from "bcryptjs";
import { EMAIL_VERIFY_TEMPLATE,PASSWORD_RESET_TEMPLATE } from "../config/emailTemplates.js";
import transporter from "../config/nodeMailer.js";

export const register = async (req,res)=>{
    const {username,email,password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({msg:"Missing Details"});
    }

    try{
        const exists = await userModel.findOne({email});

        if(exists && exists.emailVerified){
            return res.status(400).json({msg:"Email already registered"});
        }

        if(exists && !exists.emailVerified){
            // NOTE: If same email but different username is submitted, 
            // we continue with existing username. This is intentional.

            const otp = String(Math.floor(100000+Math.random()*900000));

            exists.verifyEmailOtp = otp;
            exists.verifyEmailOtpExpireAt = Date.now() + 10*60*1000;

            await exists.save();

            req.session.userId = exists._id;

            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: email,
                subject: `Verify Your Account`,
                html : EMAIL_VERIFY_TEMPLATE
                                    .replace("{{email}}", exists.email)
                                    .replace("{{otp}}", otp)
                                    .replace("{{expiresIn}}", 10)
            }

            await transporter.sendMail(mailOptions);

            return res.status(200).json({ 
                msg: "OTP resent. Verify your email.", 
                verify: false
            });
        }

        const dup_username = await userModel.findOne({username});
        if(dup_username){
            return res.status(400).json({msg:"Username already exists"});
        }

        if(password.length<8){
            return res.status(400).json({msg:"Password must be atleast 8 characters"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        const user = await userModel.create({
            username,
            email,
            password:hashedPassword,
            verifyEmailOtp: otp,
            verifyEmailOtpExpireAt: Date.now() + 10 * 60 * 1000
        });

        req.session.userId = user._id;

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: `Verify Your Account`,
            html : EMAIL_VERIFY_TEMPLATE
                                    .replace("{{email}}", email)
                                    .replace("{{otp}}", otp)
                                    .replace("{{expiresIn}}", 10)
        }

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            msg:"Registration successful, verify your email",
            verify: false
        });

    }catch(error){
        return res.status(400).json({msg:error.message});
    }
}

export const verifyEmail = async (req,res)=>{
    const {otp} = req.body;

    if(!otp){
        return res.status(400).json({msg:"Otp missing"});
    }

    try{
        const userId = req.session.userId;
        if(!userId){
            return res.status(400).json({msg:"Session expired. Login or Register again."});
        }

        const user = await userModel.findById(userId);
        if(!user){
            return res.status(400).json({ msg: "User not found" });
        }

        if(user.verifyEmailOtp!==otp){
            return res.status(400).json({ msg: "Invalid OTP" });
        }
        if(user.verifyEmailOtpExpireAt<Date.now()){
            return res.status(400).json({ msg: "OTP expired. Please request a new one"});
        }

        user.emailVerified = true;
        user.verifyEmailOtp = null;
        user.verifyEmailOtpExpireAt = null;
        await user.save();

        return res.status(200).json({ msg: "Email verified successfully"});
    }catch(error){
        return res.status(400).json({msg:error.message});
    }     
}

export const resendOtp = async (req,res)=>{
    const userId = req.session.userId;
    if(!userId){
        return res.status(400).json({msg:"Session expired, Login or register again"});
    }
    try{
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(400).json({msg:"User not found"});
        }

        if(user.emailVerified){
            return res.status(400).json({msg:"Email already verified"})
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.verifyEmailOtp = otp;
        user.verifyEmailOtpExpireAt = Date.now() + 10 * 60 * 1000;
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: `Verify Your Account`,
            html : EMAIL_VERIFY_TEMPLATE
                                    .replace("{{email}}", user.email)
                                    .replace("{{otp}}", otp)
                                    .replace("{{expiresIn}}", 10)
        }

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ msg: "New OTP sent" });

    }catch(error){
        return res.status(400).json({msg:error.message});
    }
}

export const login = async (req,res)=>{

    const {input,password} = req.body;

    try{
        const user = await userModel.findOne({
            $or : [{email:input},{username:input}]
        });

        if(!user){
            return res.status(400).json({msg:"Invalid Credentials"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg:"Invalid Credentials"});
        }
        req.session.userId = user._id;

        if (!user.emailVerified) {
            return res.status(200).json({
                msg: "Email not verified",
                verify: false
            });
        }

        return res.status(200).json({
            msg:"Logged in successfully",
            verify:true
        });

    }catch(error){
        return res.status(400).json({msg:error.message});
    }
}

export const logout = async (req,res)=>{
    req.session.destroy(err=>{
        if(err) console.log(err);
        res.clearCookie("connect.sid");
        res.status(200).json({msg:"Logged Out"});
    });
}

export const sendResetPasswordOtp = async (req,res)=>{
    const {input} = req.body;

    try{
        const user = await userModel.findOne({
            $or : [{email:input},{username:input}]
        });

        if(!user){
            return res.status(400).json({msg:"Invalid Credentials"});
        }

        if(!user.emailVerified) {
            return res.status(400).json({ msg: "Please verify your email first" });
        }
        
        const otp = String(Math.floor(100000+Math.random()*900000));

        user.resetPasswordOtp = otp;
        user.resetPasswordOtpExpireAt = Date.now() + 10*60*1000;

        await user.save();

        req.session.resetUserId = user._id;

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: `Reset your password`,
            html : PASSWORD_RESET_TEMPLATE
                                .replace("{{email}}", user.email)
                                .replace("{{otp}}", otp)
                                .replace("{{expiresIn}}", 10)
        }

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ 
            msg: "Reset password OTP sent to your email", 
            resetVerify: false // for sending to the rentering new password page
        });

    }catch(error){
        return res.status(400).json({msg:error.message});
    }
}   

export const resetPassword = async (req,res)=>{
    const {otp,newPassword} = req.body;
    try{
        const userId = req.session.resetUserId;
        if(!userId){
            return res.status(400).json({msg:"Session expired. Request OTP again"});
        }

        const user = await userModel.findById(userId);
        if(!user){
            return res.status(400).json({ msg: "User not found" });
        }

        if (user.resetPasswordOtp !== otp) {
            return res.status(400).json({ msg: "Invalid OTP" });
        }

        if (user.resetPasswordOtpExpireAt < Date.now()) {
            return res.status(400).json({ msg: "OTP expired. Request a new one." });
        }

        user.resetPasswordOtp = null;
        user.resetPasswordOtpExpireAt = null;

        if(newPassword.length<8){
            return res.status(400).json({msg:"Password must be atleast 8 characters"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt);

        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({msg:"Password reset successful"});

    }catch(error){
        return res.status(400).json({msg:error.message});
    }
}

