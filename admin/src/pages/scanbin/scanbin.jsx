import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios
import './ScanBin.css'; // Include any CSS for styling

const ScanBin = () => {
    const [binId, setBinId] = useState(''); // State for bin ID input
    const [weight, setWeight] = useState(''); // State for weight input
    const [costPerKg, setCostPerKg] = useState(''); // State for cost per kg input
    const [message, setMessage] = useState(''); // State for feedback message
    const [loading, setLoading] = useState(false); // State to handle loading state

    // Function to update bin status
    const updateBinStatus = async () => {
        if (!binId || !weight || !costPerKg) {
            setMessage('Please enter a bin ID, weight, and cost per kg.'); // Validate input
            return;
        }

        setLoading(true); // Set loading state
        setMessage(''); // Clear any previous messages

        try {
            // Prepare the data to be sent to the server
            const data = {
                status: false,
                weight: parseFloat(weight), // Convert to number
                costPerKg: parseFloat(costPerKg) // Convert to number
            };

            const response = await axios.put(`http://localhost:4000/api/binPurchases/set-status-to-false/${binId}`, data);
            if (response.data.success) {
                setMessage(`Bin ${binId} status updated to false. Weight: ${weight}kg, Cost: $${costPerKg}/kg.`); // Success message
                // Clear input fields after successful update
                setBinId('');
                setWeight('');
                setCostPerKg('');
            } else {
                setMessage(`Failed to update bin status: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Error updating bin status:', error);
            setMessage('An error occurred while updating the bin status.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="scan-bin">
            <h1>Update Bin Status</h1>
            <input
                type="text"
                placeholder="Enter Bin ID"
                value={binId}
                onChange={(e) => setBinId(e.target.value)} // Update bin ID state
            />
            <input
                type="number"
                placeholder="Enter Weight of Garbage (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)} // Update weight state
            />
            <input
                type="number"
                placeholder="Enter Cost per kg"
                value={costPerKg}
                onChange={(e) => setCostPerKg(e.target.value)} // Update cost per kg state
            />
            <button onClick={updateBinStatus} disabled={loading}>
                {loading ? 'Updating...' : 'Update Status to False'}
            </button>
            {message && <p>{message}</p>} {/* Display feedback message */}
        </div>
    );
};

export default ScanBin;
