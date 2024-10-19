import React from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreLocations from "../../components/ExploreLocations/ExploreLocations";
import { useState } from "react";
import AppDownload from "../../components/AppDownload/AppDownload";
import LocationDisplay from "../../components/LocationDisplay/LocationDisplay";
import CollectionRequest from "../../components/collectionRequest/collectionRequest";
import SubmittedRequests from "../../components/SubmittedRequests/SubmittedRequests";

const Home = () => {
  const [category, setCategory] = useState("All");
  const url = "http://localhost:4000";

  return (
    <div>
      <Header />
      <ExploreLocations category={category} setCategory={setCategory} />
      <LocationDisplay category={category} />
      <CollectionRequest />
      <SubmittedRequests />
      <AppDownload />
    </div>
  );
};

export default Home;
