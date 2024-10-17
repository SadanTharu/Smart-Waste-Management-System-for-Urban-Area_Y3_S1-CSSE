import React, { useState } from "react";
import axios from "axios";

const AddCollection = () => {
  const [formData, setFormData] = useState({
    name: "",
    wasteType: "",
    date: "",
    address: "",
    reason: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/collection/add",
        formData
      );
      if (response.data.success) {
        setSuccessMessage("Collection added successfully!");
        setErrorMessage(""); // Clear any previous error messages
        setFormData({
          name: "",
          wasteType: "",
          date: "",
          address: "",
          reason: "",
        }); // Clear form
      } else {
        setErrorMessage("Failed to add collection.");
      }
    } catch (error) {
      setErrorMessage("Error adding collection. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Add New Collection</h2>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Waste Type:</label>
          <input
            type="text"
            name="wasteType"
            value={formData.wasteType}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Reason:</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Add Collection</button>
      </form>
    </div>
  );
};

export default AddCollection;
