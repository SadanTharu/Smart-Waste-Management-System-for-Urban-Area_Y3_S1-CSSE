import fs from 'fs';
import bankDetailsModel from "../models/bankDetailsModels.js";

// Add Disease Inquiry
const addBankDetails = async (req, res) => {
    let image_filename = req.file ? req.file.filename : null;

    const bank = new bankDetailsModel({
        residentID: req.body.residentID,
        residentName: req.body.residentName,
        bank: req.body.bank,
        branch: req.body.branch,
        amount: req.body.amount,
        images: image_filename,
    });

    try {
        await bank.save();
        res.json({ success: true, message: "Bank Details Added" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error adding Bank Details" });  // Improved error handling
    }
};

// List all bank details
const listBankDetails = async (req, res) => {
    try {
        const bankDetails = await bankDetailsModel.find({});
        res.json({ success: true, data: bankDetails });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching Bank Details" });
    }
};

// Remove Disease Inquiry
const removeBankDetails = async (req, res) => {
    try {
        const bankDetails = await bankDetailsModel.findById(req.body.id);
        
        if (bankDetails.images) {
            fs.unlink(`uploads/${bankDetails.images}`, (err) => {
                if (err) {
                    console.log(`Failed to delete image: ${err.message}`);
                }
            });
        }

        await bankDetailsModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "bank details removed" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error removing bank details" });
    }
};

export { addBankDetails, listBankDetails, removeBankDetails };
