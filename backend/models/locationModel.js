import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    locationName: { type: String, required: true },   // Name of the garbage collection location
    wasteType: { type: String, required: true },      // Type of waste collected (e.g., plastic, organic)
    openTime: { type: String, required: true },       // Opening time of the garbage collection location
    image: { type: String, required: true },         // Image of the garbage collection location
    address: { type: String, required: true },        // Address of the garbage collection location
});

const locationModel = mongoose.models.location || mongoose.model("location", locationSchema);
export default locationModel;
