import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DisplayCollectionRecords.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const DisplayCollectionRecords = () => {
    const navigate = useNavigate();
    const [records, setRecords] = useState([]);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRecords, setFilteredRecords] = useState([]);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/collectionrecord');
                setRecords(response.data);
                setFilteredRecords(response.data);
            } catch (err) {
                setError('Error fetching records: ' + (err.response ? err.response.data.error : err.message));
            }
        };

        fetchRecords();
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        const filtered = records.filter(record =>
            record.binID.toLowerCase().includes(value.toLowerCase()) 
        );
        setFilteredRecords(filtered);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                await axios.delete(`http://localhost:4000/api/collectionrecord/${id}`);
                setFilteredRecords(filteredRecords.filter(record => record._id !== id));
            } catch (err) {
                console.error('Error deleting record:', err);
                setError('Error deleting record: ' + (err.response ? err.response.data.error : err.message));
            }
        }
    };

    const handleUpdate = (id) => {
        navigate(`/UpdateWasteCollection/${id}`);
    };

    return (
        <div className="records-container">
            <br /><br />
            <h2>Collection Records List</h2>
            <br />
            <input
                type="text"
                placeholder="Search by Waste Bin ID" 
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-bar"
            />
            <br />
            <br />
            {error && <p className="error-text">{error}</p>}
            <div className="cards-container">
                {filteredRecords.length > 0 ? (
                    filteredRecords.map((record) => (
                        <div className="card" key={record._id}>
                            <div className="card-header">
                                <h3>Staff ID: {record.staffID}</h3>
                                <div className="card-icons">
                                    <FontAwesomeIcon
                                        icon={faEdit}
                                        className="icon edit-icon"
                                        onClick={() => handleUpdate(record._id)}
                                    />
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        className="icon delete-icon"
                                        onClick={() => handleDelete(record._id)}
                                    />
                                </div>
                            </div>
                            <p><strong>Collector's Name:</strong> {record.collectorName}</p>
                            <p><strong>Waste Bin ID:</strong> {record.binID}</p>
                            <p><strong>Waste Type:</strong> {record.wasteType}</p>
                            <p><strong>Weight:</strong> {record.weight} </p>
                        </div>
                    ))
                ) : (
                    <p>No records found.</p>
                )}
            </div>
        </div>
    );
};

export default DisplayCollectionRecords;
