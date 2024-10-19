import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext"; // Import your StoreContext
import "./SubmittedRequests.css"; // Import the CSS file

const AdminPanel = () => {
  const { userProfile } = useContext(StoreContext); // Get user profile from context
  const [localCollectionList, setLocalCollectionList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedCollectionId, setSelectedCollectionId] = useState(null); // Track selected collection for details

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

  // Toggle details view for a collection
  const toggleDetails = (id) => {
    setSelectedCollectionId(selectedCollectionId === id ? null : id);
  };

  // Handle Accept action
  const handleAccept = async (id) => {
    try {
      const response = await axios.put(`${url}/api/collection/accept/${id}`);
      if (response.status === 200 && response.data.success) {
        setSuccessMessage("Collection request accepted.");
        updateCollectionStatus(id, true); // Update the collection's status in the list
      } else {
        setErrorMessage("Failed to accept the request.");
      }
    } catch (error) {
      setErrorMessage("Failed to accept the request.");
      console.error("Error accepting collection:", error);
    }
  };

  // Handle Reject action
  const handleReject = async (id) => {
    try {
      const response = await axios.put(`${url}/api/collection/reject/${id}`);
      if (response.status === 200 && response.data.success) {
        setSuccessMessage("Collection request rejected.");
        updateCollectionStatus(id, false); // Update the collection's status in the list
      } else {
        setErrorMessage("Failed to reject the request.");
      }
    } catch (error) {
      setErrorMessage("Failed to reject the request.");
      console.error("Error rejecting collection:", error);
    }
  };

  // Update collection status in the local list
  const updateCollectionStatus = (id, isAccepted) => {
    setLocalCollectionList((prevList) =>
      prevList.map((collection) =>
        collection._id === id ? { ...collection, isAccepted } : collection
      )
    );
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
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      collection.isAccepted === true
                        ? "status-text accepted"
                        : collection.isAccepted === false
                        ? "status-text rejected"
                        : "status-text pending"
                    }
                  >
                    {collection.isAccepted === true
                      ? "Accepted"
                      : collection.isAccepted === false
                      ? "Rejected"
                      : "Pending"}
                  </span>
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
                      disabled={collection.isAccepted !== null} // Disable if already accepted/rejected
                    >
                      Accept
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleReject(collection._id)}
                      disabled={collection.isAccepted !== null} // Disable if already accepted/rejected
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
    </div>
  );
};

export default AdminPanel;
