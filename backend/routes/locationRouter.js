import express from 'express';
import multer from 'multer';
import { addLocation, locationList, removeLocation, updateLocation } from '../controllers/locationController.js';

const locationRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

locationRouter.post("/add", upload.single("image"), addLocation);
locationRouter.get("/list", locationList);
locationRouter.post("/remove", removeLocation);
locationRouter.put("/update/:id", upload.single("image"), updateLocation);

export default locationRouter;
