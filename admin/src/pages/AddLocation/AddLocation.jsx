import React, { useState } from "react";
import "./AddLocation.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const AddLocation = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    locationName: "",
    wasteType: "",
    openTime: "morning", // Default garbage type
    address: "", // Default collection time
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("locationName", data.locationName);
    formData.append("wasteType", data.wasteType);
    formData.append("openTime", data.openTime);
    formData.append("address", data.address);
    formData.append("image", image);

    //try catch block for eror handling in submitting

    try {
      const response = await axios.post(`${url}/api/location/add`, formData);
      if (response.data.success) {
        setData({
          locationName: "",
          wasteType: "",
          openTime: "morning",
          address: "galle",
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
          <p>Location address</p>
          <textarea
            onChange={onChangeHandler}
            value={data.address}
            name="address"
            rows="6"
            placeholder="add the address"
            required
          />
        </div>

        <div className="add-garbage-type flex-col">
          <p>Type of Garbage</p>
          <select
            onChange={onChangeHandler}
            name="wasteType"
            value={data.wasteType}
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
            value={data.openTime}
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
