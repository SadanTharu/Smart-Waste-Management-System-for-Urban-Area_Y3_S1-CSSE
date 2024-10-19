import express from 'express';
import { storeGarbageDetails } from '../controllers/garbageController.js';

const router = express.Router();

// Route to store garbage details
router.post('/store', storeGarbageDetails);

export default router;
