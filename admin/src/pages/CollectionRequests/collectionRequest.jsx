import React, { useState, useEffect } from "react";
import axios from "axios";
import "./collectionRequest.css"; // Import the CSS file

const AdminPanel = () => {
  const [localCollectionList, setLocalCollectionList] = useState([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showAcceptPopup, setShowAcceptPopup] = useState(false); // State for animation popup

  const url = "http://localhost:4000"; // Replace with your actual backend URL

  // Fetch the collection list from the backend
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(`${url}/api/collection/list`);

        if (response.status === 200 && response.data.success) {
          setLocalCollectionList(response.data.data); // Ensure data is accessed correctly
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

  // Handle Reject - Remove the item from both frontend and backend
  const handleReject = async (id) => {
    try {
      const response = await axios.post(`${url}/api/collection/remove`, {
        id: id, // Send collection ID
      });

      if (response.data.success) {
        setLocalCollectionList((prevList) =>
          prevList.filter((collection) => collection._id !== id)
        );
        setSuccessMessage("Collection rejected and removed successfully.");
      } else {
        setErrorMessage("Failed to remove collection.");
      }
    } catch (error) {
      setErrorMessage("Network error while rejecting the collection.");
      console.error("Error rejecting collection:", error);
    }

    setSelectedCollectionId(null); // Deselect after rejection
  };

  // Handle Accept with animation
  const handleAccept = (id) => {
    console.log("Accepted collection with ID:", id);

    // Trigger popup animation
    setShowAcceptPopup(true);

    // Hide the popup after a few seconds
    setTimeout(() => {
      setShowAcceptPopup(false);
    }, 2000); // Adjust the duration of the popup display

    setSelectedCollectionId(null); // Deselect after accepting
  };

  // Toggle showing the details of the selected collection
  const toggleDetails = (id) => {
    setSelectedCollectionId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="admin-panel">
      <h2>Manage Collection Requests</h2>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <div className="collection-list-full">
        {localCollectionList && localCollectionList.length > 0 ? (
          localCollectionList.map((collection) => (
            <div key={collection._id}>
              <div
                className="collection-container"
                onClick={() => toggleDetails(collection._id)}
              >
                <p>
                  <strong>ID:</strong> {collection._id}
                </p>
                <p>
                  <strong>Name:</strong> {collection.name}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(collection.date).toLocaleDateString()}
                </p>
              </div>

              {/* Show additional details when the item is clicked */}
              {selectedCollectionId === collection._id && (
                <div className="collection-details">
                  <p>
                    <strong>Waste Type:</strong> {collection.wasteType}
                  </p>
                  <p>
                    <strong>Address:</strong> {collection.address}
                  </p>
                  <p>
                    <strong>Reason:</strong> {collection.reason}
                  </p>

                  <div className="modal-actions">
                    <button
                      className="accept-btn"
                      onClick={() => handleAccept(collection._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleReject(collection._id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No collection requests available.</p>
        )}
      </div>

      {/* Popup for Accept Animation */}
      {showAcceptPopup && (
        <div className="accept-popup">
          <p>Request Accepted!</p>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
