import express from 'express';
import { storeBinPurchases, getBinPurchasesByUser, updateBinStatus, getFullBins, setBinStatusToFalse } from '../controllers/binPurchaseController.js';

const router = express.Router();

// Route to store bin purchases
router.post('/store', storeBinPurchases);
router.get('/user/:userId', getBinPurchasesByUser);
router.put('/user/:binId', updateBinStatus);
router.get('/full', getFullBins);
router.put('/set-status-to-false/:binId', setBinStatusToFalse);

export default router;