import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  userId: { type: String, required: true }, 
    paidAmount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Export the model
const PaymentModel = mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
export default PaymentModel;