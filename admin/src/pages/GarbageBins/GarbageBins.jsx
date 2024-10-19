import React, { useState } from 'react'

import "./GarbageBins.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const GarbageBins = ({ url }) => {
    const [binimage, setImage] = useState(null);
    const [data, setData] = useState({
        wasteType: "Organic",
        capacity: "10",
        price: "0",
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("wasteType", data.wasteType);
        formData.append("capacity", data.capacity);
        formData.append("binimage", binimage);
        formData.append("price", data.price);

        //try catch block for error handling in submitting

        try {
        const response = await axios.post(`${url}/api/garbagebin/add`, formData);
        if (response.data.success) {
            setData({
            wasteType: "Organic",
            capacity: "10",
            price: "0",
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
                    <p>Upload Bin Image</p>
                    <label htmlFor="binimage">
                        <img
                            src={binimage ? URL.createObjectURL(binimage) : assets.upload_area}
                            alt="Uploaded preview"
                        />
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id="binimage"
                        name="binimage"
                        accept="image/*" // Added to restrict file types
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
          <p>Bin Capacity</p>
          <select
            onChange={onChangeHandler}
            name="capacity"
            value={data.capacity}
            className="custom-select"
            required
          >
            <option value="10">10L</option>
            <option value="20">20L</option>
            <option value="25">25L</option>
            <option value="30">30L</option>
            <option value="50">50L</option>
            <option value="75">75L</option>
          </select>
        </div>

        <div className="add-collection-time flex-col">
        <p>Price</p>
        <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder='Write content here' required />
        </div>

        <button type="submit" className="add-btn">
          Add Location
        </button>
      </form>
    </div>
  )
}

export default GarbageBins
