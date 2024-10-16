import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './EditRemedy.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Box } from '@mui/material';

const EditRemedy = ({ url }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [remediation, setRemediation] = useState({
        diseaseName: '',
        symptoms: '',
        steps: '',
        materials: '',
        youtubeTutorial: '',
        notes: '',
    });
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRemedy = async () => {
            try {
                const response = await axios.get(`${url}/api/remediation/${id}`);
                setRemediation(response.data);
            } catch (error) {
                console.error('Error fetching remedy details:', error);
                setError(`Error: ${error.response?.data?.error || error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchRemedy();
    }, [id, url]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRemediation({ ...remediation, [name]: value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const validate = () => {
        const newErrors = {};
        if (!remediation.diseaseName) newErrors.diseaseName = 'Disease name is required.';
        if (!remediation.symptoms) newErrors.symptoms = 'Symptoms are required.';
        if (!remediation.steps) newErrors.steps = 'Remediation steps are required.';
        if (!remediation.materials) newErrors.materials = 'Materials needed are required.';
        if (remediation.youtubeTutorial && !/^https?:\/\/.+/.test(remediation.youtubeTutorial)) {
            newErrors.youtubeTutorial = 'Invalid URL format.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        const formData = new FormData();
        formData.append('diseaseName', remediation.diseaseName);
        formData.append('symptoms', remediation.symptoms);
        formData.append('steps', remediation.steps);
        formData.append('materials', remediation.materials);
        formData.append('youtubeTutorial', remediation.youtubeTutorial || '');
        formData.append('notes', remediation.notes || '');
        if (image) {
            formData.append('image', image);
        }
    
        console.log('Updating remediation with ID:', id);
        console.log('FormData:', formData);
    
        try {
            const response = await axios.put(`${url}/api/remediation/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            localStorage.removeItem('remedies');
            toast.success('Remediation updated successfully!', {
                autoClose: 1000,
                onClose: () => {
                    navigate(-1);
                }
            });
        } catch (error) {
            console.error('Error updating remediation:', error);
            if (error.response && error.response.data) {
                toast.error('Error updating remediation: ' + error.response.data.error);
            } else {
                toast.error('Error updating remediation: ' + error.message);
            }
        }
    };

    const handleCancel = () => {
        navigate(-1);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="form-container">
            <Box position="absolute" top={90} right={60}>
                <IconButton aria-label="back" color="default" onClick={() => navigate(-1)}>
                    <ArrowBackIcon />
                </IconButton>
            </Box>

            <h2>Edit Remediation</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Disease Name:</label>
                    <input
                        type="text"
                        name="diseaseName"
                        value={remediation.diseaseName}
                        onChange={handleChange}
                    />
                    {errors.diseaseName && <p className="error-text">{errors.diseaseName}</p>}
                </div>
                <div className="form-group">
                    <label>Symptoms:</label>
                    <textarea
                        name="symptoms"
                        value={remediation.symptoms}
                        onChange={handleChange}
                    />
                    {errors.symptoms && <p className="error-text">{errors.symptoms}</p>}
                </div>
                <div className="form-group">
                    <label>Remediation Steps:</label>
                    <textarea
                        name="steps"
                        value={remediation.steps}
                        onChange={handleChange}
                    />
                    {errors.steps && <p className="error-text">{errors.steps}</p>}
                </div>
                <div className="form-group">
                    <label>Materials Needed:</label>
                    <textarea
                        name="materials"
                        value={remediation.materials}
                        onChange={handleChange}
                    />
                    {errors.materials && <p className="error-text">{errors.materials}</p>}
                </div>
                <div className="form-group">
                    <label>YouTube Tutorial (URL):</label>
                    <input
                        type="text"  // Changed to text
                        name="youtubeTutorial"
                        value={remediation.youtubeTutorial}
                        onChange={handleChange}
                    />
                    {errors.youtubeTutorial && <p className="error-text">{errors.youtubeTutorial}</p>}
                </div>
                <div className="form-group">
                    <label>Notes/Warnings:</label>
                    <textarea
                        name="notes"
                        value={remediation.notes}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Upload New Image (optional):</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
                <div className="button-group">
                    <button type="submit" className="submit-button">Update Remediation</button>
                    <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default EditRemedy;
