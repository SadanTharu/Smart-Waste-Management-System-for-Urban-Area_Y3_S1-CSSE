import paymentModel from "../models/paymentModel.js";
import fs from 'fs';


//add details
const addBankDetails = async (req,res) =>{
    
    const bankDetails = new paymentModel({
        residentName: req.body.residentName,
        bankName: req.body.bankName,
        branch: req.body.branch,
        branch: req.body.branch,
        amount: req.body.amount,
        date: req.body.date,
        images: image_filename
    });


    try {
        await bankDetails.save();
        res.json({ success: true, message: "Bank Details Added" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error adding Bank Details" });  // Improved error handling
    }

}

//list details
const listBankDetails = async(req,res) =>{
    try {
        const bankDetails = await paymentModel.find({});
        res.json({ success: true, data: bankDetails });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching Bank Details" });
    }
}

//remove details
const removeBankDetails = async(req,res) =>{
    try {
        const bankDetails = await paymentModel.findById(req.body.id);
        
        if (bankDetails.images) {
            fs.unlink(`uploads/${bankDetails.images}`, (err) => {
                if (err) {
                    console.log(`Failed to delete image: ${err.message}`);
                }
            });
        }

        await paymentModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Payment removed" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error removing payment" });
    }
}

export{addBankDetails, listBankDetails,removeBankDetails}