import React, { useState, useEffect } from "react";
import axios from "axios";
import "./collectionRequest.css"; // Import the CSS file

const AdminPanel = () => {
  const [localCollectionList, setLocalCollectionList] = useState([]); // Initialize as an empty array
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const url = "http://localhost:4000"; // Replace with your actual backend URL

  // Fetch the collection list from the backend
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(`${url}/api/collection/list`);

        if (response.status === 200 && response.data.success) {
          setLocalCollectionList(response.data.data); // Ensure data is accessed correctly
          setSuccessMessage("Collection data fetched successfully.");
        } else {
          setErrorMessage("Failed to fetch collection data.");
        }
      } catch (error) {
        setErrorMessage("Failed to fetch collection data.");
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, []);

  // Handle Reject - Remove the item from the frontend only
  const handleReject = (id) => {
    setLocalCollectionList((prevList) =>
      prevList.filter((collection) => collection._id !== id)
    );
  };

  return (
    <div>
      <h2>Admin Panel - Manage Collection Requests</h2>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Waste Type</th>
            <th>Date</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {localCollectionList && localCollectionList.length > 0 ? (
            localCollectionList.map((collection) => (
              <tr key={collection._id}>
                <td>{collection.name}</td>
                <td>{collection.wasteType}</td>
                <td>{new Date(collection.date).toLocaleDateString()}</td>
                <td>{collection.address}</td>
                <td>
                  <button className="accept-btn">Accept</button>
                  <button
                    className="reject-btn"
                    onClick={() => handleReject(collection._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No collection requests available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
