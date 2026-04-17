import express from 'express'
import { getUsers, UserLogin, UserRegister } from '../controller/userController.js';

const UserRouter = express.Router();

UserRouter.post("/register",UserRegister);
UserRouter.post("/login",UserLogin);
UserRouter.get("/getdata",getUsers);

export default UserRouter;