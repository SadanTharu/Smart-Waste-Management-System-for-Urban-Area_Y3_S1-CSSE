import mongoose from "mongoose";

const bankDetailsSchema = new mongoose.Schema({
    residentID: { type: String, required: true },
    residentName: { type: String, required: true },
    bank: { type: String },
    branch: { type: String },
    amount: { type: Number, required: true },
    images: { type: String },
    paymentMethod: { type: String, required: true }, // Ensure this is here
    cardNumber: { type: String }, 
    cardHolder: { type: String }, 
    expiryDate: { type: String }, 
    cvv: { type: String }, 
    verified: { type: Boolean, default: false }
})

const bankDetailsModel = mongoose.models.bankDetails || mongoose.model("bankDetails", bankDetailsSchema);

export default bankDetailsModel;
