import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const authAdmin = async(req,res,next)=>{
    const {token} = req.headers;
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded)
            return res.json({success:false,message:"Invalid token!!"});
        next();
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message})
    }
}


export default authAdmin;