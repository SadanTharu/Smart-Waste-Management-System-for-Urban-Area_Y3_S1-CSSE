import express from 'express';
import {
    reportIssue,
    getAllIssues,
    getIssueById,
    updateIssue,
    deleteIssue,
} from '../../controllers/Collectors/issueReportController.js';

const Issuerouter = express.Router();

// Route to report a new issue
Issuerouter.post('/report', reportIssue);

// Route to get all reported issues
Issuerouter.get('/', getAllIssues);

// Route to get an issue report by ID
Issuerouter.get('/:id', getIssueById);

// Route to update an issue report by ID
Issuerouter.put('/:id', updateIssue);

// Route to delete an issue report by ID
Issuerouter.delete('/:id', deleteIssue);

export default Issuerouter;
