import IssueReportModel from '../../models/Collectors/IssueReportModel.js';

// Create a new issue report
const reportIssue = async (req, res) => {
    const { staffID, collectorName, binID, issue } = req.body;

    try {
        const newIssue = new IssueReportModel({ 
            staffID,
            collectorName,
            binID,
            issue,
        });

        const savedIssue = await newIssue.save();
        res.status(201).json(savedIssue);
    } catch (error) {
        res.status(400).json({ error: 'Error reporting issue: ' + error.message });
    }
};

// Get all reported issues
 const getAllIssues = async (req, res) => {
    try {
        const issues = await IssueReportModel.find();
        res.status(200).json(issues);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching issues: ' + error.message });
    }
};

// Get an issue report by ID
 const getIssueById = async (req, res) => {
    try {
        const { id } = req.params;
        const issue = await IssueReportModel.findById(id);

        if (!issue) {
            return res.status(404).json({ error: 'Issue not found' });
        }

        res.status(200).json(issue);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching issue: ' + error.message });
    }
};

// Update an issue report by ID
 const updateIssue = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedIssue = await IssueReportModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedIssue) {
            return res.status(404).json({ error: 'Issue not found' });
        }

        res.status(200).json(updatedIssue);
    } catch (error) {
        res.status(500).json({ error: 'Error updating issue: ' + error.message });
    }
};

// Delete an issue report by ID
 const deleteIssue = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedIssue = await IssueReportModel.findByIdAndDelete(id);

        if (!deletedIssue) {
            return res.status(404).json({ error: 'Issue not found' });
        }

        res.status(200).json({ message: 'Issue deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting issue: ' + error.message });
    }
};

export { reportIssue, getAllIssues, getIssueById, updateIssue, deleteIssue };