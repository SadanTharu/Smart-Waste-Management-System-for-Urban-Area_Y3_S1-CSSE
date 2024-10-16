import mongoose from "mongoose";

const diseasesInquirySchema = new mongoose.Schema({
    farmerName: {type:String,required:true},
    email: {type:String,required:true},
    phone: {type:String,required:true},
    inquiryDate: {type:String,required:true},
    inquiryTopic: {type:String,required:true},
    symptoms: {type:String,required:true},
    area: {type:Number,required:true},
    location: {type:String,required:true},
    images: {type:String,required:true},
    priorityLevel: {type:String,required:true}

})

const diseaseInquiryModel = mongoose.models.inquiry || mongoose.model("diseaseInquiry",diseasesInquirySchema )

export default diseaseInquiryModel;