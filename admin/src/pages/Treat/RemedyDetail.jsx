import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';  
import { Box, Typography, Card, CardContent, CardMedia, Button, CircularProgress, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import './RemedyDetail.css';

const RemedyDetail = ({ url }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [remedy, setRemedy] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        const fetchRemedy = async () => {
            try {
                const response = await axios.get(`${url}/api/remediation/${id}`);
                setRemedy(response.data);
            } catch (error) {
                console.error('Error fetching remedy details:', error);
                setError(`Error: ${error.response?.data?.error || error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchRemedy();
    }, [id, url]);

    const handleEditClick = () => {
        navigate(`/edit-remedy/${id}`);
    };

    const handleDeleteClick = () => {
        setOpenDialog(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`${url}/api/remediation/${id}`);
            toast.success('Remedy deleted successfully!');
            setOpenDialog(false);
            navigate('/RemedyList');
        } catch (error) {
            console.error('Error deleting remedy:', error);
            toast.error(`Error deleting remedy: ${error.response?.data?.error || error.message}`);
        }
    };

    const handleCancelDelete = () => {
        setOpenDialog(false);
    };

    if (loading) return (
        <Box className="loading-container">
            <CircularProgress size={60} className="loading-spinner" />
        </Box>
    );

    if (error) return (
        <Box className="error-container">
            <Typography variant="h6" color="error">{error}</Typography>
        </Box>
    );

    return (
        <Card className="remedy-detail-card">
            {remedy?.image && (
                <CardMedia
                    component="img"
                    height="300"
                    image={remedy.image}
                    alt={remedy.diseaseName}
                    className="remedy-detail-image"
                />
            )}
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h4" component="div" className="remedy-detail-title">
                        {remedy?.diseaseName}
                    </Typography>
                    <Box>
                        <IconButton aria-label="edit" color="primary" onClick={handleEditClick}>
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" color="error" onClick={handleDeleteClick}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>

                <Typography variant="h6" component="div" className="remedy-detail-subtitle">
                    Symptoms
                </Typography>
                <hr /><br />
                <Typography variant="body1" className="remedy-detail-text">
                    {remedy?.symptoms.split('\n').map((line, index) => (
                        <div key={index} style={{ marginBottom: '8px' }}>{line.trim()}</div>
                    ))}
                </Typography>
                <br />

                <Typography variant="h6" component="div" className="remedy-detail-subtitle">
                    Steps
                </Typography>
                <hr /><br />
                <Typography variant="body1" className="remedy-detail-text">
                    {remedy?.steps.split('\n').map((line, index) => (
                        <div key={index} style={{ marginBottom: '8px' }}>{line.trim()}</div>
                    ))}
                </Typography>
                <br />

                <Typography variant="h6" component="div" className="remedy-detail-subtitle">
                    Materials
                </Typography>
                <hr /><br />
                <Typography variant="body1" className="remedy-detail-text">
                    {remedy?.materials.split('\n').map((line, index) => (
                        <div key={index} style={{ marginBottom: '8px' }}>{line.trim()}</div>
                    ))}
                </Typography>
                <br />

                <Typography variant="h6" component="div" className="remedy-detail-subtitle">
                    YouTube Tutorial
                </Typography>
                <hr /><br /><br />
                <Button
                    variant="contained"
                    style={{ backgroundColor: '#28a745', color: '#ffffff' }}
                    href={remedy?.youtubeTutorial}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="remedy-detail-button"
                >
                    Watch Tutorial
                </Button>
                <br /><br /><br />

                <Typography variant="h6" component="div" className="remedy-detail-subtitle">
                    Notes
                </Typography>
                <hr /><br />
                <Typography variant="body1" className="remedy-detail-text">
                    {remedy?.notes.split('\n').map((line, index) => (
                        <div key={index} style={{ marginBottom: '8px' }}>{line.trim()}</div>
                    ))}
                </Typography>
            </CardContent>

            <Dialog
                open={openDialog}
                onClose={handleCancelDelete}
                aria-labelledby="delete-confirmation-dialog"
            >
                <DialogTitle id="delete-confirmation-dialog">Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this remedy? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
};

export default RemedyDetail;