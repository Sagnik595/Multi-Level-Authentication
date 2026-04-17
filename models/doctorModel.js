import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    exp:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    speciality:{
        type:String,
        required:true
    }
});

const doctor = mongoose.model("doctor",doctorSchema);

export default doctor;