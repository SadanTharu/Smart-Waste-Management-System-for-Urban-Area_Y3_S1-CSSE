import mongoose from 'mongoose';

const paymentCalSchema = new mongoose.Schema({
    residentName: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    images: {
        type: String, // Will store the filename of the uploaded receipt
        required: true
    }
});

// Exporting the model as the default export
const paymentModel = mongoose.models.Payment || mongoose.model('Payment', paymentCalSchema);
export default paymentModel
