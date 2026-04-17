import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import user from "../models/userModel.js";



const adminLogin = async(req,res)=>{
  const {email,password} = req.body;
  try {
    if(email!==process.env.ADMIN_EMAIL)
      return res.json({success:false,message:"Wrong email!!"});
    if(password!==process.env.ADMIN_PASSWORD)
      return res.json({success:false,message:"Wrong password!!"});
    const atoken = jwt.sign({email},process.env.JWT_SECRET);
    return res.json({success:true,token:atoken});
  } catch (error) {
    console.log(error);
    return res.json({success:false,message:error.message});
  }
}

const editUser = async (req, res) => {
  const { searchE, name, email } = req.body;

  try {
    const userData = await user.updateOne(
      { email: searchE },
      { $set: { name, email } },
    );
    return res.json({ success: true, data: userData });
  } catch (error) {
    console.log(error);
    return res.json({success:false,message:error.message});
    
  }
};


export {editUser, adminLogin}