import mongoose from "mongoose";

const BinPurchaseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
    binId: {
        type: String,
        required: true,
    },
    wasteType: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});

// Export the model
const BinPurchaseModel = mongoose.models.BinPurchase || mongoose.model("BinPurchase", BinPurchaseSchema);
export default BinPurchaseModel;
