import express from 'express';
import { loginUser, registerUser, getUserProfile, updateUserProfile } from "../controllers/UserController.js";

const userRouter = express.Router()

userRouter.post('/login', loginUser)
userRouter.post('/register', registerUser)
userRouter.get('/getuser', getUserProfile)
userRouter.post('/updateUser', updateUserProfile);



export default userRouter;