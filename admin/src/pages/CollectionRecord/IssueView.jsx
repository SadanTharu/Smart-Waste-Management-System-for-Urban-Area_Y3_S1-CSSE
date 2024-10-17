import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './IssueView.css';

const IssueView = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [issues, setIssues] = useState([]);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredIssues, setFilteredIssues] = useState([]);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/issue');
                setIssues(response.data);
                setFilteredIssues(response.data); // Initialize filteredIssues
            } catch (err) {
                setError('Error fetching issues: ' + (err.response ? err.response.data.error : err.message));
            }
        };

        fetchIssues();
    }, []);

    // Function to handle delete
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this issue?')) {
            try {
                await axios.delete(`http://localhost:4000/api/issue/${id}`);
                setFilteredIssues(filteredIssues.filter(issue => issue._id !== id)); // Update filteredIssues after delete
            } catch (err) {
                setError('Error deleting issue: ' + (err.response ? err.response.data.error : err.message));
            }
        }
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        const filtered = issues.filter(issue =>
            issue.binID.toLowerCase().includes(value.toLowerCase()) // Filter by binID
        );
        setFilteredIssues(filtered); // Update filteredIssues based on search
    };

    return (
        <div className="records-container">
            <h2>Reported Issues</h2>
            <br />
            <input
                type="text"
                placeholder="Search by Waste Bin ID" // Placeholder for the search bar
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-bar"
            />
            <br /><br />
            {error && <p className="error-text">{error}</p>}
            <div className="cards-container">
                {filteredIssues.length > 0 ? (
                    filteredIssues.map((issue) => (
                        <div className="card" key={issue._id}>
                            <div className="card-header">
                                <h3>Staff ID: {issue.staffID}</h3>
                                <div className="card-icons">
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        className="icon delete-icon"
                                        onClick={() => handleDelete(issue._id)}
                                        title="Delete Issue"
                                    />
                                </div>
                            </div>
                            <p><strong>Collector's Name:</strong> {issue.collectorName}</p>
                            <p><strong>Waste Bin ID:</strong> {issue.binID}</p>
                            <p><strong>Issue Description:</strong> {issue.issue}</p>
                        </div>
                    ))
                ) : (
                    <p>No issues reported.</p>
                )}
            </div>
        </div>
    );
};

export default IssueView;
