import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './ReportIssues.css'; 
import { assets } from '../../assets/assets';

const UpdateReportIssue = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const initialState = {
        staffID: '',
        collectorName: '',
        binID: '',
        issue: '',
    };

    const [issueData, setIssueData] = useState(initialState);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchIssue = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/issue/${id}`);
                setIssueData(response.data);
            } catch (error) {
                console.error('Error fetching issue:', error);
                alert('Error fetching issue: ' + (error.response ? error.response.data.error : error.message));
            }
        };

        fetchIssue();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIssueData({ ...issueData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!issueData.staffID) newErrors.staffID = 'Staff ID is required.';
        if (!issueData.collectorName) newErrors.collectorName = 'Collector\'s name is required.';
        if (!issueData.binID) newErrors.binID = 'Waste Bin ID is required.';
        if (!issueData.issue) newErrors.issue = 'Issue description is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            await axios.put(`http://localhost:4000/api/issue/${id}`, issueData);
            alert('Issue updated successfully!');
            navigate('/IssueList'); 
        } catch (error) {
            console.error('Error updating issue:', error);
            alert('Error updating issue: ' + (error.response ? error.response.data.error : error.message));
        }
    };

    const handleCancel = () => {
        setIssueData(initialState);
        setErrors({});
        navigate('/IssueList'); 
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2>Update Report Issue</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="staffID">Staff ID:</label>
                        <input
                            type="text"
                            name="staffID"
                            id="staffID"
                            value={issueData.staffID}
                            onChange={handleChange}
                            placeholder="Staff ID"
                            aria-invalid={errors.staffID ? 'true' : 'false'}
                        />
                        {errors.staffID && <p className="error-text">{errors.staffID}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="collectorName">Collection Personnel's Name:</label>
                        <input
                            type="text"
                            name="collectorName"
                            id="collectorName"
                            value={issueData.collectorName}
                            onChange={handleChange}
                            placeholder="Name"
                            aria-invalid={errors.collectorName ? 'true' : 'false'}
                        />
                        {errors.collectorName && <p className="error-text">{errors.collectorName}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="binID">Waste Bin ID:</label>
                        <input
                            type="text"
                            name="binID"
                            id="binID"
                            value={issueData.binID}
                            onChange={handleChange}
                            placeholder="Bin ID"
                            aria-invalid={errors.binID ? 'true' : 'false'}
                        />
                        {errors.binID && <p className="error-text">{errors.binID}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="issue">Issue Description:</label>
                        <textarea
                            name="issue"
                            id="issue"
                            value={issueData.issue}
                            onChange={handleChange}
                            placeholder="Describe the issue here..."
                            rows="4"
                            aria-invalid={errors.issue ? 'true' : 'false'}
                        />
                        {errors.issue && <p className="error-text">{errors.issue}</p>}
                    </div>
                    <div className="button-group">
                        <button type="submit" className="submit-button" >Update Report</button>
                        <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
            <div className="image-container">
                <img src={assets.issue} alt="Waste Collection" />
            </div>
        </div>
    );
};

export default UpdateReportIssue;
