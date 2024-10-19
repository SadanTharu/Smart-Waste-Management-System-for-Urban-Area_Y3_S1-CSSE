import React, { useState, useEffect } from "react";
import axios from "axios";
import "./collectionRequest.css"; // Import the CSS file

const AdminPanel = () => {
  const [localCollectionList, setLocalCollectionList] = useState([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const [popupMessage, setPopupMessage] = useState(""); // State for popup message

  const url = "http://localhost:4000"; // Replace with your actual backend URL

  // Fetch the collection list from the backend
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(`${url}/api/collection/list`);
        if (response.status === 200 && response.data.success) {
          setLocalCollectionList(response.data.data);
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

  // Handle Accept
  const handleAccept = async (id) => {
    try {
      const response = await axios.post(`${url}/api/collection/update-status`, {
        id: id,
        isAccepted: true, // Mark as accepted
      });

      if (response.data.success) {
        setSuccessMessage("Collection accepted successfully.");
        setPopupMessage("Collection has been accepted.");
        setLocalCollectionList((prevList) =>
          prevList.map((collection) =>
            collection._id === id
              ? { ...collection, isAccepted: true }
              : collection
          )
        );
        setShowPopup(true); // Show popup after action
      } else {
        setErrorMessage("Failed to accept collection.");
      }
    } catch (error) {
      setErrorMessage("Error while accepting collection.");
      console.error("Error accepting collection:", error);
    }

    setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2 seconds
    setSelectedCollectionId(null); // Deselect after accepting
  };

  // Handle Reject
  const handleReject = async (id) => {
    try {
      const response = await axios.post(`${url}/api/collection/update-status`, {
        id: id,
        isAccepted: false, // Mark as rejected
      });

      if (response.data.success) {
        setSuccessMessage("Collection rejected successfully.");
        setPopupMessage("Collection has been rejected.");
        setLocalCollectionList((prevList) =>
          prevList.map((collection) =>
            collection._id === id
              ? { ...collection, isAccepted: false }
              : collection
          )
        );
        setShowPopup(true); // Show popup after action
      } else {
        setErrorMessage("Failed to reject collection.");
      }
    } catch (error) {
      setErrorMessage("Error while rejecting collection.");
      console.error("Error rejecting collection:", error);
    }

    setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2 seconds
    setSelectedCollectionId(null); // Deselect after rejecting
  };

  // Toggle the display of details for a specific collection
  const toggleDetails = (id) => {
    setSelectedCollectionId((prevId) => (prevId === id ? null : id)); // Toggle between show/hide
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

      {/* Popup for Action (Accept/Reject) */}
      {showPopup && (
        <div className="action-popup">
          <p>{popupMessage}</p>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
