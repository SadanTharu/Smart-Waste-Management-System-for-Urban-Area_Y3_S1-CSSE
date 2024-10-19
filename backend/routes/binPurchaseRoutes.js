import express from 'express';
import { storeBinPurchases, getBinPurchasesByUser, updateBinStatus } from '../controllers/binPurchaseController.js';

const router = express.Router();

// Route to store bin purchases
router.post('/store', storeBinPurchases);
router.get('/user/:userId', getBinPurchasesByUser);
router.put('/user/:binId', updateBinStatus);

export default router;