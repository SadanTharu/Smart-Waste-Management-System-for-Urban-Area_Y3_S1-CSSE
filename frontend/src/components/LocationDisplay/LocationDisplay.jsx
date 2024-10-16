import React, { useContext } from "react";
import "./LocationDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import LocationItem from "../LocationItem/LocationItem";

const LocationDisplay = ({ category }) => {
  const { location_list } = useContext(StoreContext);

  return (
    <div className="food-display" id="diseases-display">
      <h1>Currently available information...</h1>
      <p>“contact us +94740956299”</p>
      <div className="food-display-list">
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
