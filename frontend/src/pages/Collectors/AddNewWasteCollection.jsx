import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddNewWasteCollection.css';
import { assets } from '../../assets/assets';

const AddNewWasteCollection = () => {
    const navigate = useNavigate();
    const initialState = {
        staffID: '',
        collectorName: '',
        binID: '',
        wasteType: '',
        weight: '',
    };

    const [collectionData, setCollectionData] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCollectionData({ ...collectionData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};

        // Required fields validation
        if (!collectionData.staffID) newErrors.staffID = 'Staff ID is required.';
        if (!collectionData.collectorName) newErrors.collectorName = 'Collector\'s name is required.';
        if (!collectionData.binID) newErrors.binID = 'Waste bin ID is required.';
        if (!collectionData.wasteType) newErrors.wasteType = 'Waste type is required.';
        
        // Weight validation (assuming weight should be a positive number)
        if (!collectionData.weight) {
            newErrors.weight = 'Weight is required.';
        } else if (isNaN(collectionData.weight) || Number(collectionData.weight) <= 0) {
            newErrors.weight = 'Weight must be a positive number.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const response = await axios.post('http://localhost:4000/api/collectionrecord/add', collectionData);
            console.log('Response:', response.data);
            setCollectionData(initialState);
            setErrors({});
            navigate('/DisplayCollectionRecords'); 
        } catch (error) {
            console.error('Error response:', error.response);
            alert('Error adding waste collection: ' + (error.response ? error.response.data.error : error.message));
        }
    };

    const handleCancel = () => {
        setCollectionData(initialState);
        setErrors({});
        navigate('/WasteHome');
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2>Record Collection Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="staffID">Staff ID:</label>
                        <input
                            type="text"
                            name="staffID"
                            id="staffID"
                            value={collectionData.staffID}
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
                            value={collectionData.collectorName}
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
                            value={collectionData.binID}
                            onChange={handleChange}
                            placeholder="Bin ID"
                            aria-invalid={errors.binID ? 'true' : 'false'}
                        />
                        {errors.binID && <p className="error-text">{errors.binID}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="wasteType">Waste Type:</label>
                        <input
                            type="text"
                            name="wasteType"
                            id="wasteType"
                            value={collectionData.wasteType}
                            onChange={handleChange}
                            placeholder="e.g., Organic"
                            aria-invalid={errors.wasteType ? 'true' : 'false'}
                        />
                        {errors.wasteType && <p className="error-text">{errors.wasteType}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="weight">Weight:</label>
                        <input
                            type="text"
                            name="weight"
                            id="weight"
                            value={collectionData.weight}
                            onChange={handleChange}
                            placeholder="e.g., 1.5"
                            aria-invalid={errors.weight ? 'true' : 'false'}
                        />
                        {errors.weight && <p className="error-text">{errors.weight}</p>}
                    </div>
                    <div className="button-group">
                        <button type="submit" className="submit-button">Add Collection</button>
                        <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                    </div>
                    <br />
                    <a
                        href="/ReportIssues"
                        style={{
                            fontStyle: 'italic',
                            textDecoration: 'underline',
                            color: 'orange',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'darkorange')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'orange')}
                    >
                        Report Issues
                    </a>
                </form>
            </div>
            <div className="image-container">
                <img src={assets.bin} alt="Waste Collection" />
            </div>
        </div>
    );
};

export default AddNewWasteCollection;
