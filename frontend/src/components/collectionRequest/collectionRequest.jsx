import React, { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import Lottie from "react-lottie";
import successAnimation from "../../animations/success.json"; // Path to your animation file
import "./collectionRequest.css";

const AddCollection = () => {
  const [formData, setFormData] = useState({
    name: "",
    wasteType: "",
    date: "",
    address: "",
    reason: "",
  });

  const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);

  const { addCollection, userProfile } = useContext(StoreContext); // Fetch userProfile from context

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle checkbox change
  const handleAgreementChange = (e) => {
    setIsAgreementChecked(e.target.checked);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAgreementChecked) {
      setErrorMessage("You must accept the additional fee agreement.");
      return;
    }

    const dataToSubmit = {
      ...formData,
      userId: userProfile.googleId, // Pass the user's ID along with the form data
    };

    try {
      await addCollection(dataToSubmit);
      setErrorMessage("");
      setFormData({
        name: "",
        wasteType: "",
        date: "",
        address: "",
        reason: "",
      });
      // Show success popup
      setIsSuccessPopupVisible(true);
      setTimeout(() => {
        setIsSuccessPopupVisible(false); // Hide the popup after 3 seconds
      }, 3000);
    } catch (error) {
      setErrorMessage("Error adding collection. Please try again.");
      console.error("Error:", error);
    }
  };

  const successPopupOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="form-container" id="CustomPickup">
      <h2>Special Collection Request</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {isSuccessPopupVisible && (
        <div className="success-popup">
          <Lottie options={successPopupOptions} height={150} width={150} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="collection-form">
        <div className="form-field">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Waste Type:</label>
          <select
            name="wasteType"
            value={formData.wasteType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select waste type</option>
            <option value="organic">Organic</option>
            <option value="recyclable">Recyclable</option>
            <option value="hazardous">Hazardous</option>
            <option value="general">General</option>
          </select>
        </div>

        <div className="form-field">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-field">
          <label>Reason:</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-field">
          <label>
            <input
              type="checkbox"
              checked={isAgreementChecked}
              onChange={handleAgreementChange}
            />
            Accept additional fee to be added to my monthly bill
          </label>
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={!isAgreementChecked}
        >
          Add Collection
        </button>
      </form>
    </div>
  );
};

export default AddCollection;
