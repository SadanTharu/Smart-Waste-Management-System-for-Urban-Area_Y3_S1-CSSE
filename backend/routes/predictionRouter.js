import express from 'express';
import { predictCropYield } from '../controllers/predictionController.js';

const router = express.Router();

router.post('/', predictCropYield);

export default router;
