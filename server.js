import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connect from './config/connect.js';
import UserRouter from './routes/userRoutes.js';
import adminRouter from './routes/adminRoutes.js';

dotenv.config();
connect();
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/user",UserRouter);
app.use("/api/admin",adminRouter);

app.get("/",(req,res)=>{
    res.send("These API will surely work!!")
});

app.listen(port,()=>{
    console.log("Server started successfully!!");
})