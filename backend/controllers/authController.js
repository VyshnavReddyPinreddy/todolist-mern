import { request } from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    return jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:"7d"}); 
};
 
export const signup = async (request,response) =>{
    try{
        const {username,email,password} = request.body;

        // Check if username already exists
        const existingUsername = await User.findOne({username});
        if(existingUsername) return response.status(400).json({message:"Username already exists"});
        
        // Check if email already exists
        const existingEmail = await User.findOne({email});
        if(existingEmail) return response.status(400).json({message:"Email already exists"});

        //create a user
        const user = await User.create({username,email,password});

        response.status(201).json({
            _id : user._id,
            username : user.username,
            email : user.email, 
            token : generateToken(user._id),
        });
    }catch (err) {
        response.status(500).json({ message: err.message });
    }
};

export const login = async (request,response) =>{
    try{
        const {email,password} = request.body;
        const user = await User.findOne({email});
        if(!user) return response.status(400).json({message:"Invalid Credentials!"});
        const isMatch = await user.matchPassword(password);
        if(!isMatch) return response.status(400).json({message:"Invalid Credentials!"});

        response.json({
            _id : user._id,
            username : user.username,
            email:user.email,
            token:generateToken(user._id),
        });
    }catch(err){
        response.status(500).json({ message: err.message });
    }
};