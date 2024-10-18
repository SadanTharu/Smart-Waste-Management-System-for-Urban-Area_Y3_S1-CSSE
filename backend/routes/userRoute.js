import express from 'express';
import { loginUser, registerUser, getUserProfile, updateUserProfile, updatePassword, AddBin } from "../controllers/UserController.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router()

userRouter.post('/login', loginUser)
userRouter.post('/register', registerUser)
userRouter.get('/getuser', getUserProfile)
userRouter.post('/updateUserDetails', updateUserProfile);
userRouter.post('/addBin', authMiddleware, AddBin);
userRouter.post('/updatePassword', updatePassword);

export default userRouter;