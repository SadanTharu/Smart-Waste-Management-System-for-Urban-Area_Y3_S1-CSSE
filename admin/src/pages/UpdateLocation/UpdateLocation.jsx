import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./UpdateLocation.css";

const UpdateLocation = ({ url = "http://localhost:4000" }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [locationData, setLocationData] = useState({
    locationName: "",
    wasteType: "",
    openTime: "morning",
    address: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setLocationData({ ...locationData, image: e.target.files[0] });
    } else {
      setLocationData({ ...locationData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Update this section to check the correct property names
    if (locationData.locationName) {
      formData.append("locationName", locationData.locationName);
    }
    if (locationData.wasteType) {
      // Changed from description to wasteType
      formData.append("wasteType", locationData.wasteType);
    }
    if (locationData.openTime) {
      // Changed from garbageType to openTime
      formData.append("openTime", locationData.openTime);
    }
    if (locationData.address) {
      // Changed from collectionTime to address
      formData.append("address", locationData.address);
    }
    if (locationData.image) {
      formData.append("image", locationData.image);
    }

    try {
      const response = await axios.put(
        `${url}/api/location/update/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        toast.success("Location updated successfully");
        navigate("/list");
      } else {
        toast.error("Error updating location");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  return (
    <div className="update-loc-form-container">
      <form className="update-loc-form" onSubmit={handleSubmit}>
        <div className="update-loc-field">
          <p>Location Name</p>
          <input
            type="text"
            name="locationName"
            value={locationData.locationName}
            onChange={handleChange}
            placeholder="Enter location name"
            required
          />
        </div>

        <div className="update-loc-field">
          <p>Address</p>
          <textarea
            name="address"
            rows="6"
            value={locationData.address}
            onChange={handleChange}
            placeholder="Enter location address"
            required
          />
        </div>

        <div className="update-loc-field">
          <p>Waste Type</p>
          <select
            name="wasteType"
            value={locationData.wasteType}
            onChange={handleChange}
            required
          >
            <option value="organic">Organic</option>
            <option value="plastic">Plastic</option>
            <option value="metal">Metal</option>
            <option value="electronic">Electronic</option>
            <option value="paper">Paper</option>
          </select>
        </div>

        <div className="update-loc-field">
          <p>Garbage Collection Time</p>
          <select
            name="openTime"
            value={locationData.openTime}
            onChange={handleChange}
            required
          >
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
        </div>

        <div className="update-loc-field">
          <p>Upload New Image</p>
          <input type="file" name="image" onChange={handleChange} />
        </div>

        <button type="submit" className="update-loc-btn">
          Update Location
        </button>
      </form>
    </div>
  );
};

export default UpdateLocation;
