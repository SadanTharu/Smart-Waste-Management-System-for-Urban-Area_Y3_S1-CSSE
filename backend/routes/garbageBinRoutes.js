import express from 'express';
import { addGarbageBin , listGarbageBins } from '../controllers/garbageBinController.js';
import multer from 'multer';

const garbageBinRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
    destination: 'binUpload/', // Adjust the destination as needed
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    },
});

const upload = multer({ storage });

// Routes
garbageBinRouter.post('/add', upload.single('binimage'), addGarbageBin);
garbageBinRouter.get('/list', listGarbageBins);

export default garbageBinRouter;