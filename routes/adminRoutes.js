import express from 'express'
import authAdmin from '../middleware/authAdmin.js';
import { adminLogin, editUser } from '../controller/adminController.js';

const adminRouter = express.Router();

adminRouter.post("/loginAuth",adminLogin);
adminRouter.post("/editUser",authAdmin,editUser);

export default adminRouter;