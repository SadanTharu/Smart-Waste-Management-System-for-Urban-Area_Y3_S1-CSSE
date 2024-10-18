import fs from 'fs';
import bankDetailsModel from "../models/bankDetailsModels.js";

// Add Bank Details
const addBankDetails = async (req, res) => {
    let image_filename = req.file ? req.file.filename : null;

    const bank = new bankDetailsModel({
        residentID: req.body.residentID,
        residentName: req.body.residentName,
        bank: req.body.paymentMethod === 'bank' ? req.body.bank : null,
        branch: req.body.paymentMethod === 'bank' ? req.body.branch : null,
        amount: req.body.amount,
        images: image_filename,
        paymentMethod: req.body.paymentMethod,  // Added paymentMethod here
        cardNumber: req.body.paymentMethod === 'card' ? req.body.cardNumber : null,
        cardHolder: req.body.paymentMethod === 'card' ? req.body.cardHolder : null,
        expiryDate: req.body.paymentMethod === 'card' ? req.body.expiryDate : null,
        cvv: req.body.paymentMethod === 'card' ? req.body.cvv : null,
    });

    try {
        await bank.save();
        res.json({ success: true, 
        message: "Bank Details Added",
        data: bank
     });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error adding Bank Details" });
    }
};

// List all bank details
const listBankDetails = async (req, res) => {
    try {
        const bankDetails = await bankDetailsModel.find({});


        // Construct the full image URLs
        const bankDetailsWithUrls = bankDetails.map(detail => ({
            ...detail.toObject(),
            receiptUrl: detail.images ? `${req.protocol}://${req.get('host')}/uploads/${detail.images}` : null // Full URL for the image
        }));


        res.json({ success: true, data: bankDetailsWithUrls });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching Bank Details" });
    }
};

// Remove Bank Details
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
        res.json({ success: true, message: "Bank details removed" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error removing bank details" });
    }
};

// Verify Bank Details
const verifyBankDetails = async (req, res) => {
    try {
      const { id } = req.body;
      await bankDetailsModel.findByIdAndUpdate(id, { verified: true });
      res.json({ success: true, message: "Bank detail verified successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Error verifying bank detail" });
    }
  };
  

export { addBankDetails, listBankDetails, removeBankDetails, verifyBankDetails };
