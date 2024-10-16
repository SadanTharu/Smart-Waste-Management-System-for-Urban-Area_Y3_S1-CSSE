import RemediationModel from "../models/T_RemediationModel.js"; 
import path from 'path';
import fs from 'fs';

// Add a new remedy
const addRemedy = async (req, res) => {
    try {
        const { diseaseName, symptoms, steps, materials, youtubeTutorial, notes } = req.body;

        const imageUrl = req.file ? `http://localhost:4000/uploads/${req.file.filename}` : '';

        const remediation = new RemediationModel({
            diseaseName,
            symptoms,
            steps,
            materials,
            youtubeTutorial,
            notes,
            image: imageUrl,
        });

        await remediation.save();
        res.status(201).json(remediation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all remedies
const getAllRemedies = async (req, res) => {
    try {
        const remedies = await RemediationModel.find();
        res.status(200).json(remedies);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getRemedyById = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from request parameters
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const remedy = await RemediationModel.findById(id);
        
        if (!remedy) {
            return res.status(404).json({ error: 'Remedy not found' });
        }

        res.status(200).json(remedy); // Send the remedy details
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Controller to Update a remedy
const updateRemedy = async (req, res) => {
    const { id } = req.params;
    const { diseaseName, symptoms, steps, materials, youtubeTutorial, notes } = req.body;
    let updatedRemedy = { diseaseName, symptoms, steps, materials, youtubeTutorial, notes };

    if (req.file) {
        updatedRemedy.image = `http://localhost:4000/uploads/${req.file.filename}`;
    }

    try {
        const remedy = await RemediationModel.findByIdAndUpdate(id, updatedRemedy, { new: true });
        if (!remedy) {
            return res.status(404).json({ error: 'Remedy not found' });
        }
        res.json(remedy);
    } catch (error) {
        console.error('Error updating remedy:', error);
        res.status(500).json({ error: error.message });
    }
};

// Controller to delete a remedy
const deleteRemedy = async (req, res) => {
    const { id } = req.params;

    try {
        const remedy = await RemediationModel.findById(id);

        if (!remedy) {
            return res.status(404).json({ error: 'Remedy not found' });
        }

        // Delete the image file if it exists
        if (remedy.image) {
            const imagePath = path.join('uploads', path.basename(remedy.image));
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await RemediationModel.findByIdAndDelete(id);

        res.status(200).json({ message: 'Remedy deleted successfully' });
    } catch (error) {
        console.error('Error deleting remedy:', error);
        res.status(500).json({ error: 'Server error while deleting the remedy' });
    }
};


export { addRemedy, getAllRemedies, getRemedyById, updateRemedy, deleteRemedy };
