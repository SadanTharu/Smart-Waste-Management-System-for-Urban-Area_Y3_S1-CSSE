import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
//import "./viewCollections.css"; // Create a CSS file for styling if needed

const ViewCollections = () => {
  const { userProfile } = useContext(StoreContext); // Get logged-in user details from context
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          `/api/collection/${userProfile.googleId}`
        ); // Adjust based on your API

        //important ......................................................
        setCollections(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching collections:", err);
        setError("Failed to load collection requests.");
        setLoading(false);
      }
    };

    fetchCollections();
  }, [userProfile.googleId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="collections-container">
      <h2>Your Submitted Collection Requests</h2>
      {collections.length === 0 ? (
        <p>No collection requests found.</p>
      ) : (
        <table className="collections-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Waste Type</th>
              <th>Date</th>
              <th>Address</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {collections.map((collection) => (
              <tr key={collection._id}>
                {" "}
                {/* Use a unique ID for each row */}
                <td>{collection.name}</td>
                <td>{collection.wasteType}</td>
                <td>{collection.date}</td>
                <td>{collection.address}</td>
                <td>{collection.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewCollections;
