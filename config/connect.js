import mongoose from "mongoose";

const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("DB connected successfully!!");
    } catch (error) {
        console.log("DB Connection Failed!!");
    }
};

export default connect;