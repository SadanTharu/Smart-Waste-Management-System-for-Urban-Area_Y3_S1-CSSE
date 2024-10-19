import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
    name: { type: String, required: true },   
    wasteType: { type: String, required: true },      
    date: { type: String, required: true },      
    address: { type: String, required: true },       
    reason: { type: String, required: true },   
    userId: { type: String, required: true }, // Add userId field to associate the request with the user
});

const collectionModel = mongoose.models.collection || mongoose.model("collection", collectionSchema);
export default collectionModel;