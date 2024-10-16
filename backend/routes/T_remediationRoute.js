import express from 'express';
import multer from 'multer'; // Import multer for handling file uploads
import { addRemedy, getAllRemedies, getRemedyById, updateRemedy, deleteRemedy } from '../controllers/RemedyController.js'; 

const remediationRouter = express.Router();

// Set up multer for handling file uploads
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });

// Add a new remedy
remediationRouter.post('/add', upload.single('image'), addRemedy); // Handle image upload

// Get all remedies
remediationRouter.get('/list', getAllRemedies);

// Get a specific remedy by ID
remediationRouter.get('/:id', getRemedyById);

// Update a remedy by ID
remediationRouter.put('/:id', upload.single('image'), updateRemedy);

// DELETE /api/remediation/:id
remediationRouter.delete('/:id', deleteRemedy);

export default remediationRouter;
