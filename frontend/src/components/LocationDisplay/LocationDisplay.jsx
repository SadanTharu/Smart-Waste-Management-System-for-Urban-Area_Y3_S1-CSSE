import React, { useContext } from "react";
import "./LocationDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import LocationItem from "../LocationItem/LocationItem";

const LocationDisplay = ({ category }) => {
  const { location_list } = useContext(StoreContext);

  return (
    <div className="collection-display" id="diseases-display">
      <h1>Available Remote Garbage Collecting Areas Near You...</h1>
      <p>
        We offer a convenient service where we collect your waste from
        designated remote areas, allowing you to manage your trash efficiently
      </p>
      <p>Contact us +94740956299</p>
      <div className="collection-display-list">
        {location_list.map((item) => {
          if (category === "All" || category === item.category) {
            return (
              <LocationItem
                key={item._id}
                id={item._id}
                locationName={item.locationName}
                wasteType={item.wasteType}
                openTime={item.openTime}
                address={item.address}
                image={item.image}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default LocationDisplay;
