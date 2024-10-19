// models/GarbageBin.js
import mongoose from 'mongoose';

const garbageBinSchema = new mongoose.Schema({
    wasteType: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    binimage: {
        type: String, // You may want to store the image URL or path
        required: true,
    },
}, { timestamps: true });

const GarbageBin = mongoose.model('GarbageBin', garbageBinSchema);

export default GarbageBin;
