import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext"; // Import your StoreContext
import "./SubmittedRequests.css"; // Import the CSS file

const AdminPanel = () => {
  const { userProfile } = useContext(StoreContext); // Get user profile from context
  const [localCollectionList, setLocalCollectionList] = useState([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showAcceptPopup, setShowAcceptPopup] = useState(false); // State for animation popup

  const url = "http://localhost:4000"; // Replace with your actual backend URL

  // Fetch the collection list for the logged-in user
  useEffect(() => {
    const fetchCollections = async () => {
      if (userProfile && userProfile.googleId) {
        try {
          const response = await axios.get(
            `${url}/api/collection/collection/${userProfile.googleId}`
          );

          if (response.status === 200 && response.data.success) {
            setLocalCollectionList(response.data.data); // Ensure data is accessed correctly
          } else {
            setErrorMessage("Failed to fetch collection data.");
          }
        } catch (error) {
          setErrorMessage("Failed to fetch collection data.");
          console.error("Error fetching collections:", error);
        }
      }
    };

    fetchCollections();
  }, [userProfile, url]); // Depend on userProfile to fetch collections when it changes

  // Toggle showing the details of the selected collection
  const toggleDetails = (id) => {
    setSelectedCollectionId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="admin-panel">
      <h2>Added Requests</h2> {/* Renamed topic */}
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
