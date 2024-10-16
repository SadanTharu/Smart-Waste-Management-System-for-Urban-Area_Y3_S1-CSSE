import mongoose from "mongoose";

const remediationSchema = new mongoose.Schema({
    diseaseName: { type: String, required: true },
    symptoms: { type: String, required: true },
    steps: { type: String, required: true },
    materials: { type: String, required: true },
    youtubeTutorial: { type: String, required: false },
    notes: { type: String, required: false },
    image: { type: String, required: false },
});

const RemediationModel = mongoose.model('Remediation', remediationSchema);

export default RemediationModel;
