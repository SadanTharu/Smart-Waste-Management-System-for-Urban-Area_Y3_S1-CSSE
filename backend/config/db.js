import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://matheesha:matheesha@cluster0.vy9j6.mongodb.net/case').then(()=>console.log("DB connected"));
    
}