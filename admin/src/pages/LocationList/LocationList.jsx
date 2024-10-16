import React, { useState, useEffect } from "react";
import "./LocationList.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const LocationList = ({ url }) => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/location/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  const removeLocation = async (locationId) => {
    try {
      const response = await axios.post(`${url}/api/location/remove`, {
        id: locationId,
      });
      if (response.data.success) {
        toast.success("Location deleted successfully");
        fetchList();
      } else {
        toast.error("Error deleting location");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  const handleUpdate = (locationId) => {
    navigate(`/update/${locationId}`);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Location Data</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Location Name</b>
          <b>address</b>
          <b>wasteType</b>
          <b>Collection Time</b>
          <b>Update</b>
          <b>Delete</b>
        </div>
        {list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className="list-table-format">
              <img
                src={`${url}/images/` + item.image}
                alt={item.locationName}
              />
              <p>{item.locationName}</p>
              <p>{item.address}</p>
              <p>{item.wasteType}</p>
              <p>{item.openTime}</p>

              <img
                src={assets.update_icon}
                alt="update"
                className="update-button"
                onClick={() => handleUpdate(item._id)}
              />

              <img
                src={assets.delete_icon}
                alt="Delete"
                className="delete-icon"
                onClick={() => removeLocation(item._id)}
              />
            </div>
          ))
        ) : (
          <p>No location data available.</p>
        )}
      </div>
    </div>
  );
};

export default LocationList;
