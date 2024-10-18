import express from "express";
import { addBankDetails, listBankDetails, removeBankDetails, verifyBankDetails} from "../controllers/bankDetailsController.js";
import multer from "multer";

const bankDetailsRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Routes
bankDetailsRouter.post("/add", upload.single("images"), addBankDetails);
bankDetailsRouter.get("/list", listBankDetails);
bankDetailsRouter.post("/remove", removeBankDetails);
bankDetailsRouter.post('/verify', verifyBankDetails);

export default bankDetailsRouter;
