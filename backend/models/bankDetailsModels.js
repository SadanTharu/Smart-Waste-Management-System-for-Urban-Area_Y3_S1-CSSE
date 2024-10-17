import mongoose from "mongoose";

const bankDetailsSchema = new mongoose.Schema({
    residentID: {type:String,required:true},
    residentName: {type:String,required:true},
    bank: {type:String,required:true},
    branch: {type:String,required:true},
    amount: {type:Number,required:true},
    images: {type:String,required:true},
})

const bankDetailsModel = mongoose.models.bankDetails || mongoose.model("bankDetails",bankDetailsSchema )

export default bankDetailsModel;