import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext"; // Adjust the import path based on your project structure
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios"; // Make sure to install axios for HTTP requests
import "./AvailableBins.css"; // Include any CSS for styling

const AvailableBins = () => {
  const { userProfile } = useContext(StoreContext); // Get user profile from context
  const navigate = useNavigate(); // Initialize the navigate function
  const [bins, setBins] = useState([]); // State to hold bins
  const [loading, setLoading] = useState(true); // State to handle loading state

  // Log the userProfile object for debugging
  console.log("User Profile:", userProfile);
  
  // Log the Google ID if it exists
  if (userProfile && userProfile.googleId) {
    console.log("Google ID:", userProfile.googleId);
  } else {
    console.log("Google ID not found.");
  }

  // Function to fetch bins
  const fetchBins = async () => {
    try {
      console.log("Fetching bins for user ID:", userProfile.googleId); // Log user ID
      const response = await axios.get(`http://localhost:4000/api/binPurchases/user/${userProfile.googleId}`);
      console.log("API Response:", response.data); // Log the full API response
      
      // Check if the response contains binPurchases
      if (response.data && Array.isArray(response.data.binPurchases)) {
        setBins(response.data.binPurchases); // Set bins to the binPurchases array
        console.log("Bins fetched successfully:", response.data.binPurchases);
      } else {
        console.error("Unexpected response format:", response.data);
        setBins([]); // Ensure bins is an empty array if response is not as expected
      }
    } catch (error) {
      console.error("Error fetching bins:", error);
    } finally {
      setLoading(false);
      console.log("Loading state set to false.");
    }
  };

  // Function to update bin status
  const updateBinStatus = async (binId) => {
    try {
      // Send request to update bin status to true
      const response = await axios.put(`http://localhost:4000/api/binPurchases/user/${binId}`, { status: true });
      console.log("Update Response:", response.data); // Log response from update request

      // Update local state if the update was successful
      if (response.data.success) {
        setBins((prevBins) => 
          prevBins.map((bin) => 
            bin.binId === binId ? { ...bin, status: true } : bin
          )
        );
        console.log(`Bin ${binId} marked as full.`);
      } else {
        console.error("Failed to update bin status:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating bin status:", error);
    }
  };
  
  useEffect(() => {
    // Check if the user is logged in
    if (!userProfile || !userProfile.googleId) {
      navigate('/'); // Navigate to home page if user is not logged in
    } else {
      fetchBins(); // Fetch bins when component mounts
    }
  }, [userProfile, navigate]); // Depend on userProfile to check login status and fetch bins

  if (loading) {
    console.log("Currently loading bins..."); // Log while loading
    return <div>Loading...</div>; // Show loading message while fetching
  }

  console.log("Bins after loading:", bins); // Log the bins after loading

  return (
    <div className="available-bins">
      <h1>Available Bins</h1>
      {bins.length === 0 ? (
        <p>No bins available.</p>
      ) : (
        <ul>
          {bins.map((bin) => {
            // Log details of each bin
            console.log("Bin Details:", {
              binId: bin.binId,
              wasteType: bin.wasteType,
              capacity: bin.capacity,
              status: bin.status,
            });

            return (
              <li key={bin.binId}>
                <h2>Bin ID: {bin.binId}</h2>
                <p>Waste Type: {bin.wasteType}</p>
                <p>Capacity: {bin.capacity}L</p>
                <p>Status: {bin.status ? "Full" : "Empty"}</p>
                {/* Add button to mark status as true */}
                <button onClick={() => updateBinStatus(bin.binId)} disabled={bin.status}>
                  Mark as Full
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AvailableBins;
