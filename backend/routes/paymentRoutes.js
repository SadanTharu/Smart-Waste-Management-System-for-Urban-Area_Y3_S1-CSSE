import express from 'express'
import {addBankDetails, listBankDetails,removeBankDetails} from '../controllers/paymentController.js'
// import upload from '../middleware/multer';
import multer from "multer"




const paymentRouter = express.Router();


// Image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`);  // Fixed filename formatting
    }
});


const upload = multer({ storage: storage });



paymentRouter.post('/add',upload.single("images"),addBankDetails);
paymentRouter.post('/remove',removeBankDetails);
paymentRouter.get('/list',listBankDetails);


export default paymentRouter