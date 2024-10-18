import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://sadantharu:12345@cluster0.6npwn.mongodb.net/SmartWastManagement').then(()=>console.log("DB connected"));
    
}