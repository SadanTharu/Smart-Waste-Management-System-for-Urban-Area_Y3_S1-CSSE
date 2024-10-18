import express from 'express';
import { googleLogin } from '../controllers/authController.js';

const collectionRouter = express.Router();

// Route for handling Google login
collectionRouter.post("/google", googleLogin);

export default collectionRouter;
