import mongoose from 'mongoose';

const issueReportSchema = new mongoose.Schema({
    staffID: {
        type: String,
        required: true,
    },
    collectorName: {
        type: String,
        required: true,
    },
    binID: {
        type: String,
        required: true,
    },
    issue: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const IssueReportModel = mongoose.model('IssueReport', issueReportSchema);

export default IssueReportModel;
