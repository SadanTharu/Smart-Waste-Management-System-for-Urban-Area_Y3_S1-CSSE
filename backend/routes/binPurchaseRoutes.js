import express from 'express';
import { storeBinPurchases } from '../controllers/binPurchaseController.js';

const router = express.Router();

// Route to store bin purchases
router.post('/store', storeBinPurchases);

export default router;