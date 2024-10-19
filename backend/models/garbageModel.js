import mongoose from 'mongoose';

const garbageSchema = new mongoose.Schema({
    binId: { type: String, required: true }, // Reference to the bin ID
    weight: { type: Number, required: true }, // Weight of the garbage in kg
    costPerKg: { type: Number, required: true }, // Cost per kg
    totalCost: { type: Number, required: true }, // Total cost
    createdAt: { type: Date, default: Date.now }, // Timestamp of the entry
});

// Create and export the Garbage model
const Garbage = mongoose.model('Garbage', garbageSchema);
export default Garbage;
