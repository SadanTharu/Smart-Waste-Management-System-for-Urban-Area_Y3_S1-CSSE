import React, { useState } from 'react';
import axios from 'axios';
import './ScanBin.css'; // Include any CSS for styling

const ScanBin = () => {
    const [binId, setBinId] = useState('');
    const [weight, setWeight] = useState('');
    const [costPerKg, setCostPerKg] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const updateBinStatus = async () => {
        if (!binId || !weight || !costPerKg) {
            setMessage('Please enter bin ID, weight, and cost per kg.'); // Validate input
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            // Update bin status to false (as per previous logic)
            const response = await axios.put(`http://localhost:4000/api/binPurchases/set-status-to-false/${binId}`, { status: false });

            if (response.data.success) {
                // After updating the bin status, store garbage details
                const totalCost = weight * costPerKg; // Calculate total cost
                const garbageResponse = await axios.post('http://localhost:4000/api/garbage/store', {
                    binId,
                    weight,
                    costPerKg,
                    totalCost,
                });

                if (garbageResponse.data.success) {
                    setMessage(`Bin ${binId} status updated to false and garbage details recorded.`);
                } else {
                    setMessage(`Failed to record garbage details: ${garbageResponse.data.message}`);
                }
            } else {
                setMessage(`Failed to update bin status: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Error updating bin status:', error);
            setMessage('An error occurred while updating the bin status.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="scan-bin">
            <h1>Update Bin Status</h1>
            <input
                type="text"
                placeholder="Enter Bin ID"
                value={binId}
                onChange={(e) => setBinId(e.target.value)}
            />
            <input
                type="number"
                placeholder="Enter Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
            />
            <input
                type="number"
                placeholder="Enter Cost per kg"
                value={costPerKg}
                onChange={(e) => setCostPerKg(e.target.value)}
            />
            <button onClick={updateBinStatus} disabled={loading}>
                {loading ? 'Updating...' : 'Update Status and Store Garbage'}
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ScanBin;
