import React, { useState } from "react";
import "./AddLocation.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const AddLocation = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    locationName: "",
    description: "",
    garbageType: "organic", // Default garbage type
    collectionTime: "morning", // Default collection time
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("locationName", data.locationName);
    formData.append("description", data.description);
    formData.append("garbageType", data.garbageType);
    formData.append("collectionTime", data.collectionTime);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/location/add`, formData);
      if (response.data.success) {
        setData({
          locationName: "",
          description: "",
          garbageType: "organic",
          collectionTime: "morning",
        });
        setImage(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error submitting data");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
          <p>Upload Location Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Uploaded preview"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            name="image"
            hidden
            required
          />
        </div>

        <div className="add-location-name flex-col">
          <p>Enter Location Name</p>
          <input
            onChange={onChangeHandler}
            value={data.locationName}
            type="text"
            name="locationName"
            placeholder="Enter location name here"
            required
          />
        </div>

        <div className="add-description flex-col">
          <p>Location Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Describe the location"
            required
          />
        </div>

        <div className="add-garbage-type flex-col">
          <p>Type of Garbage</p>
          <select
            onChange={onChangeHandler}
            name="garbageType"
            value={data.garbageType}
            className="custom-select"
            required
          >
            <option value="organic">Organic</option>
            <option value="plastic">Plastic</option>
            <option value="metal">Metal</option>
            <option value="electronic">Electronic</option>
            <option value="paper">Paper</option>
          </select>
        </div>

        <div className="add-collection-time flex-col">
          <p>Garbage Collection Time</p>
          <select
            onChange={onChangeHandler}
            name="collectionTime"
            value={data.collectionTime}
            className="custom-select"
            required
          >
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
        </div>

        <button type="submit" className="add-btn">
          Add Location
        </button>
      </form>
    </div>
  );
};

export default AddLocation;
