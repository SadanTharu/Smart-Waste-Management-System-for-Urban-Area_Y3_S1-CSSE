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
    description: "",
    garbageType: "organic",
    collectionTime: "morning",
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

    if (locationData.locationName) {
      formData.append("locationName", locationData.locationName);
    }
    if (locationData.description) {
      formData.append("description", locationData.description);
    }
    if (locationData.garbageType) {
      formData.append("garbageType", locationData.garbageType);
    }
    if (locationData.collectionTime) {
      formData.append("collectionTime", locationData.collectionTime);
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
        navigate("/locations");
      } else {
        toast.error("Error updating location");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  return (
    <div className="update-form">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="update-form-field">
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

        <div className="update-form-field">
          <p>Description</p>
          <textarea
            name="description"
            rows="6"
            value={locationData.description}
            onChange={handleChange}
            placeholder="Enter location description"
            required
          />
        </div>

        <div className="update-form-field">
          <p>Garbage Type</p>
          <select
            name="garbageType"
            value={locationData.garbageType}
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

        <div className="update-form-field">
          <p>Garbage Collection Time</p>
          <select
            name="collectionTime"
            value={locationData.collectionTime}
            onChange={handleChange}
            required
          >
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
        </div>

        <div className="update-form-field">
          <p>Upload New Image</p>
          <input type="file" name="image" onChange={handleChange} />
        </div>

        <button type="submit" className="update-btn">
          Update Location
        </button>
      </form>
    </div>
  );
};

export default UpdateLocation;
