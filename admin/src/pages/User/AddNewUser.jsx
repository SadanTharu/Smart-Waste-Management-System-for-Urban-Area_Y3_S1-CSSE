import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddNewUser.css'; // Create this CSS file for styling if needed

const AddNewUser = () => {
    const navigate = useNavigate();
    const initialState = {
        wasteBinId: '',
        residentId: '',
        userName: '',
        address: '',
        contactNo: '',
        email: '',
    };

    const [userData, setUserData] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};

        // Required fields validation
        if (!userData.wasteBinId) newErrors.wasteBinId = 'Waste Bin ID is required.';
        if (!userData.residentId) newErrors.residentId = 'Resident ID is required.';
        if (!userData.userName) newErrors.userName = 'User Name is required.';
        if (!userData.address) newErrors.address = 'Address is required.';
        if (!userData.contactNo) newErrors.contactNo = 'Contact Number is required.';
        if (!userData.email) newErrors.email = 'Email is required.';

        // Contact number format validation (must be 10 digits)
        if (userData.contactNo && !/^\d{10}$/.test(userData.contactNo)) {
            newErrors.contactNo = 'Contact number must be exactly 10 digits.';
        }

        // Email format validation
        if (userData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
            newErrors.email = 'Email is not valid.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validate()) return; // Validate before submitting
    
        try {
            const response = await axios.post('http://localhost:4000/api/IssueForAdminrouter/user', userData);
            console.log('Response:', response.data);
            setUserData(initialState);
            setErrors({});
            navigate('/DisplayUserRecords'); // Adjust the navigation path as needed
        } catch (error) {
            if (error.response && error.response.data.error) {
                setErrors({ form: error.response.data.error });
            } else {
                console.error('Error response:', error.response);
                setErrors({ form: 'An unexpected error occurred.' });
            }
        }
    };

    const handleCancel = () => {
        setUserData(initialState);
        setErrors({});
        navigate('/CollectionRecordDashboard'); 
    };

    return (
        <div className="container">
            <div className="form-container">
                <h2>Add New User</h2>
                {errors.form && <p className="error-text">{errors.form}</p>} {/* Display form-level errors */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="residentId">Resident ID:</label>
                        <input
                            type="text"
                            name="residentId"
                            id="residentId"
                            value={userData.residentId}
                            onChange={handleChange}
                            placeholder="Resident ID"
                            aria-invalid={errors.residentId ? 'true' : 'false'}
                        />
                        {errors.residentId && <p className="error-text">{errors.residentId}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="userName">User Name:</label>
                        <input
                            type="text"
                            name="userName"
                            id="userName"
                            value={userData.userName}
                            onChange={handleChange}
                            placeholder="User Name"
                            aria-invalid={errors.userName ? 'true' : 'false'}
                        />
                        {errors.userName && <p className="error-text">{errors.userName}</p>}
                    </div> 
                    <div className="form-group">
                        <label htmlFor="wasteBinId">Waste Bin ID:</label>
                        <input
                            type="text"
                            name="wasteBinId"
                            id="wasteBinId"
                            value={userData.wasteBinId}
                            onChange={handleChange}
                            placeholder="Waste Bin ID"
                            aria-invalid={errors.wasteBinId ? 'true' : 'false'}
                        />
                        {errors.wasteBinId && <p className="error-text">{errors.wasteBinId}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            value={userData.address}
                            onChange={handleChange}
                            placeholder="Address"
                            aria-invalid={errors.address ? 'true' : 'false'}
                        />
                        {errors.address && <p className="error-text">{errors.address}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="contactNo">Contact Number:</label>
                        <input
                            type="text"
                            name="contactNo"
                            id="contactNo"
                            value={userData.contactNo}
                            onChange={handleChange}
                            placeholder="Contact Number (10 digits)"
                            aria-invalid={errors.contactNo ? 'true' : 'false'}
                        />
                        {errors.contactNo && <p className="error-text">{errors.contactNo}</p>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={userData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            aria-invalid={errors.email ? 'true' : 'false'}
                        />
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>
                    <div className="button-group">
                        <button type="submit" className="submit-button">Add User</button>
                        <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewUser;
