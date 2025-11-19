import userModel from "../models/User.js";

export const fetchUserName = async (req,res)=>{

    try{
        const userId = req.session.userId;
        if(!userId){
            return res.status(401).json({login:true,msg:"Unauthorized Access"});
        }
        const user = await userModel.findById(userId);

        if(!user){
            return res.status(400).json({msg:"User not found"});
        }

        return res.status(200).json({username:user.username});
        
    }catch(error){
        return res.status(500).json({msg:"Internal Server Error"});
    }
    

}