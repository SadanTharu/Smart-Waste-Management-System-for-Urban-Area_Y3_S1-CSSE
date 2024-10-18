import React from "react";
import "./ExploreDeseases.css";
import { location_menu_list } from "../../assets/assets";

const ExploreDeseases = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="diseases">
      <h1>View Collecting Places</h1>
      <p className="explore-menu-text">
        These are the places where we collect garbage...
      </p>
      <div className="explore-menu-list">
        {location_menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.location_name ? "All" : item.location_name
                )
              }
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.location_name ? "active" : ""}
                src={item.location_image}
                alt=""
              />
              <p>{item.location_name}</p>
              <span>{item.case_count} Galle</span>{" "}
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreDeseases;
