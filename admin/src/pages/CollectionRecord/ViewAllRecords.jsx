import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ViewAllRecords.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import the autoTable plugin

const ViewAllRecords = () => {
    const navigate = useNavigate();
    const [records, setRecords] = useState([]);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

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

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);

        // Filter records by the selected date
        const filtered = records.filter(record => {
            const recordDate = new Date(record.createdAt).toISOString().split('T')[0]; // Get YYYY-MM-DD format
            return recordDate === e.target.value;
        });
        setFilteredRecords(filtered);
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["Staff ID", "Collector's Name", "Resident ID", "Waste Bin ID", "Waste Type", "Weight (KG)", "Created At", "Updated At"];
        const tableRows = [];

        filteredRecords.forEach(record => {
            const recordData = [
                record.staffID,
                record.collectorName,
                record.residentID,
                record.binID,
                record.wasteType,
                record.weight,
                formatDate(record.createdAt),
                formatDate(record.updatedAt),
            ];
            tableRows.push(recordData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        doc.text("Collection Records Report", 14, 15);
        doc.save('Collection_Records_Report.pdf');
    };

    return (
        <div className="records-container">
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
            <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="date-picker"
            />
            <button onClick={generatePDF} className="generate-report-button">Generate PDF</button>
            <br /><br />
            {error && <p className="error-text">{error}</p>}
            <div className="cards-container">
                {filteredRecords.length > 0 ? (
                    filteredRecords.map((record) => (
                        <div className="card" key={record._id}>
                            <div className="card-header">
                                <h3>Staff ID: {record.staffID}</h3>
                                <div className="card-icons">
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        className="icon delete-icon"
                                        onClick={() => handleDelete(record._id)}
                                    />
                                </div>
                            </div>
                            <p><strong>Collector's Name:</strong> {record.collectorName}</p>
                            <p><strong>Resident ID:</strong> {record.residentID}</p>
                            <p><strong>Waste Bin ID:</strong> {record.binID}</p>
                            <p><strong>Waste Type:</strong> {record.wasteType}</p>
                            <p><strong>Weight:</strong> {record.weight} </p>
                            <p><strong>Created At:</strong> {formatDate(record.createdAt)}</p>
                            <p><strong>Updated At:</strong> {formatDate(record.updatedAt)}</p>
                        </div>
                    ))
                ) : (
                    <p>No records found.</p>
                )}
            </div>
        </div>
    );
};

export default ViewAllRecords;
