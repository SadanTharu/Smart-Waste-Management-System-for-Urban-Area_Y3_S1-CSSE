import React, { useContext } from "react";
import "./LocationItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const LocationItem = ({
  id,
  locationName,
  address,
  wasteType,
  openTime,
  image,
}) => {
  const { url } = useContext(StoreContext);

  return (
    <div className="disease-item">
      <div className="disease-item-img-container">
        <img
          className="disease-item-image"
          src={`${url}/images/${image}`}
          alt={locationName}
        />
      </div>
      <div className="disease-item-info">
        <div className="disease-item-name-rating">
          <p>{locationName}</p>
        </div>
        <p className="disease-item-desc">{address}</p>

        <p className="disease-item-desc">{openTime}</p>
        <p className="disease-item-case-count"> waste type: {wasteType} </p>
      </div>
    </div>
  );
};

export default LocationItem;
