import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import user from "../models/userModel.js";

const UserRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password)
      return res.json({ success: false, message: "Incomplete credentials!!" });
    const check = await user.findOne({ email });
    if (check)
      return res.json({ success: false, message: "User already exists!!" });
    if (!validator.isEmail(email))
      return res.json({ success: false, message: "Invalid email format!!" });
    if (password.length < 8)
      return res.json({ success: false, message: "Password is too short!!" });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const userData = await user.create({
      name,
      email,
      password: hash,
    });

    const utoken = jwt.sign({ email }, process.env.JWT_SECRET);

    return res.json({
      success: true,
      message: "User Registered",
      token: utoken,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

const UserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password)
      return res.json({ success: false, message: "Incomplete credentials!!" });
    const userData = await user.findOne({email});
    if (!userData)
      return res.json({ success: false, message: "No user found!!" });
    
    const passcheck = await bcrypt.compare(password, userData.password);
    if (!passcheck)
      return res.json({ success: false, message: "Incorrect password!!" });

    const token = jwt.sign({email},process.env.JWT_SECRET);

    return res.json({ success: true, message: "Login Successful", token });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};





const getUsers = async(req,res)=>{
    const {token} = req.headers;
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded)
            return res.json({success:false,message:"Invalid User!!"});

        const userData = await user.find().select("-password -_id -__v");
        return res.json({success:true,data:userData});
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error});
    }
}





export { UserRegister, UserLogin, getUsers };
