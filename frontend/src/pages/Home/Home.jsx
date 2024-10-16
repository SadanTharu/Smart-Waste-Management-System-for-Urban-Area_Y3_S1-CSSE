import React from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreDeseases from "../../components/ExploreDeseases/ExploreDeseases";
import { useState } from "react";
import AppDownload from "../../components/AppDownload/AppDownload";
import LocationDisplay from "../../components/LocationDisplay/LocationDisplay";

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <ExploreDeseases category={category} setCategory={setCategory} />
      <LocationDisplay category={category} />
      <AppDownload />
    </div>
  );
};

export default Home;
