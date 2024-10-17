import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './AddNewWasteCollection.css';
import { assets } from '../../assets/assets';

const UpdateWasteCollection = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the ID from the URL
    const initialState = {
        staffID: '',
        collectorName: '',
        residentID: '',
        binID: '',
        wasteType: '',
        weight: '',
    };

    const [collectionData, setCollectionData] = useState(initialState);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Fetch the existing data for the given ID
        const fetchCollectionData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/collectionrecord/${id}`);
                setCollectionData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('Error fetching collection data');
            }
        };
        fetchCollectionData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCollectionData({ ...collectionData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!collectionData.staffID) newErrors.staffID = 'Staff ID is required.';
        if (!collectionData.collectorName) newErrors.collectorName = 'Collector\'s name is required.';
        if (!collectionData.binID) newErrors.binID = 'Waste bin ID is required.';
        if (!collectionData.wasteType) newErrors.wasteType = 'Waste type is required.';
        if (!collectionData.weight) newErrors.weight = 'Weight is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        try {
            const response = await axios.put(`http://localhost:4000/api/collectionrecord/${id}`, collectionData);
            alert('Issue updated successfully!');
            console.log('Response:', response.data);
            setErrors({});
            // Redirect to DisplayCollectionRecords after updating the collection
            navigate('/DisplayCollectionRecords');
        } catch (error) {
            console.error('Error response:', error.response);
            alert('Error updating waste collection: ' + (error.response ? error.response.data.error : error.message));
        }
    };

    const handleCancel = () => {
        navigate('/DisplayCollectionRecords');
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2>Update Collection Details</h2>
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
                            placeholder="e.g., 1.5KG"
                            aria-invalid={errors.weight ? 'true' : 'false'}
                        />
                        {errors.weight && <p className="error-text">{errors.weight}</p>}
                    </div>
                    <div className="button-group">
                        <button type="submit" className="submit-button" >Update Collection</button>
                        <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
            <div className="image-container">
                <img src={assets.bin} alt="Waste Collection" />
            </div>
        </div>
    );
};

export default UpdateWasteCollection;
