import contactRemedyModel from "../models/contactRemedyManagementModel.js"
import fs from'fs'

//add data
const  addDiseaseForRemedyMng = async(req,res) => {

    let image_filename = `${req.file.filename}`;

    const contactRemedy = new contactRemedyModel({
   

        newDiseaseName: req.body.newDiseaseName,
        symptoms: req.body.symptoms,
        severityLevel: req.body.severityLevel,
        category: req.body.category,
        recomendedTreatment:req.body.recomendedTreatment,
        image: image_filename,

    })
    try{
        await contactRemedy.save();
        res.json({success:true,message:"contactRemedy data added"})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}
export {addDiseaseForRemedyMng}