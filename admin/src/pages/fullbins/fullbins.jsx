import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Make sure to install axios
import './FullBins.css'; // Include any CSS for styling

const FullBins = () => {
    const [fullBins, setFullBins] = useState([]); // State to hold full bins
    const [loading, setLoading] = useState(true); // State to handle loading state

    // Function to fetch full bins
    const fetchFullBins = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/binPurchases/full'); // Call the new API endpoint
            if (response.data && response.data.success) {
                setFullBins(response.data.fullBins); // Set the full bins in state
            } else {
                console.error('Failed to fetch full bins:', response.data.message);
            }
        } catch (error) {
            console.error('Error fetching full bins:', error);
        } finally {
            setLoading(false); // Set loading to false when done
        }
    };

    useEffect(() => {
        fetchFullBins(); // Fetch full bins when component mounts
    }, []);

    if (loading) {
        return <div>Loading full bins...</div>; // Show loading message while fetching
    }

    return (
        <div className="full-bins">
            <h1>Full Bins</h1>
            {fullBins.length === 0 ? (
                <p>No full bins available.</p> // Message if no full bins are found
            ) : (
                <ul>
                    {fullBins.map((bin) => (
                        <li key={bin.binId}>
                            <h2>Bin ID: {bin.binId}</h2>
                            <p>Waste Type: {bin.wasteType}</p>
                            <p>Capacity: {bin.capacity}L</p>
                            <p>Status: {bin.status ? 'Full' : 'Empty'}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FullBins;
