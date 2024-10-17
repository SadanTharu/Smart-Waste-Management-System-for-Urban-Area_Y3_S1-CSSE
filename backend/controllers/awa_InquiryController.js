import diseaseInquiryModel from "../models/awa_DiseaseInquiryModels.js";
import fs from 'fs';

// Add Disease Inquiry
const addDiseaseInquiry = async (req, res) => {
    let image_filename = req.file ? req.file.filename : null;

    const disease = new diseaseInquiryModel({
        farmerName: req.body.farmerName,
        email: req.body.email,
        phone: req.body.phone,
        inquiryDate: req.body.inquiryDate,
        inquiryTopic: req.body.inquiryTopic,
        symptoms: req.body.symptoms,
        area: req.body.area,
        location: req.body.location,
        images: image_filename,
        priorityLevel: req.body.priorityLevel
    });

    try {
        await disease.save();
        res.json({ success: true, message: "Disease Inquiry Added" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error adding inquiry" });  // Improved error handling
    }
};

// List all Disease Inquiries
const listDiseaseInquiry = async (req, res) => {
    try {
        const diseaseInquiry = await diseaseInquiryModel.find({});
        res.json({ success: true, data: diseaseInquiry });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching inquiries" });
    }
};

// Remove Disease Inquiry
const removeDiseaseInquiry = async (req, res) => {
    try {
        const diseaseInquiry = await diseaseInquiryModel.findById(req.body.id);
        
        if (diseaseInquiry.images) {
            fs.unlink(`uploads/${diseaseInquiry.images}`, (err) => {
                if (err) {
                    console.log(`Failed to delete image: ${err.message}`);
                }
            });
        }

        await diseaseInquiryModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Disease Inquiry removed" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error removing inquiry" });
    }
};

export { addDiseaseInquiry, listDiseaseInquiry, removeDiseaseInquiry };
