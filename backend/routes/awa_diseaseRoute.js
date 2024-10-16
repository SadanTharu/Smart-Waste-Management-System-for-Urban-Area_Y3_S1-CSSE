import express from "express";
import { addDiseaseInquiry, listDiseaseInquiry, removeDiseaseInquiry } from "../controllers/awa_InquiryController.js";
import multer from "multer";

const diseaseRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`);  // Fixed filename formatting
    }
});

const upload = multer({ storage: storage });

// Routes
diseaseRouter.post("/add", upload.single("images"), addDiseaseInquiry);
diseaseRouter.get("/list", listDiseaseInquiry);
diseaseRouter.post("/remove", removeDiseaseInquiry);

export default diseaseRouter;
