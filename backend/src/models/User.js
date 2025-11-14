import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    verifyEmailOtp:{
        type:String,
        default:'',
    },
    verifyEmailOtpExpireAt:{
        type:Number,
        default:'',
    },
    emailVerified:{
        type:Boolean,
        default:false,
    },
    resetPasswordOtp:{
        type:String,
        default:0,
    },
    resetPasswordOtpExpireAt:{
        type:Number,
        default:0,
    },
});

const userModel = mongoose.models.user || mongoose.model('User',userSchema);

export default userModel;