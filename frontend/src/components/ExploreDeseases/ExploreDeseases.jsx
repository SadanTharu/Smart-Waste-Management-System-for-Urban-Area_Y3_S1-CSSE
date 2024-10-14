import React from "react";
import "./ExploreDeseases.css";
import { disease_menu_list } from "../../assets/assets";

const ExploreDeseases = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="diseases">
      <h1>View Collecting Places</h1>
      <p className="explore-menu-text">
        These are the places where we collec garbage...
      </p>
      <div className="explore-menu-list">
        {disease_menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.disease_name ? "All" : item.disease_name
                )
              }
              key={index}
              className="explore-menu-list-item"
            >
              <img
                className={category === item.disease_name ? "active" : ""}
                src={item.disease_image}
                alt=""
              />
              <p>{item.disease_name}</p>
              <span>{item.case_count} Disease</span>{" "}
              {/* Displaying case count instead of price */}
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreDeseases;
