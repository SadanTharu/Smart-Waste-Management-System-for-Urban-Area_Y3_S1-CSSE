import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { gapi } from "gapi-script";

export const StoreContext = createContext(null);

const clientId =
  "190098913382-cgc12ml4nme8u32kjgumdcm50nhsc28g.apps.googleusercontent.com"; // Your Google client ID

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [location_list, setLocationList] = useState([]);
  const [collection_list, setCollectionList] = useState([]);

  // Login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  // Fetch location list
  const fetchLocationList = async () => {
    try {
      const response = await axios.get(url + "/api/location/list");
      setLocationList(response.data.data);
    } catch (error) {
      console.error("Failed to fetch location list:", error);
    }
  };

  // Fetch collection list
  const fetchCollectionList = async () => {
    try {
      const response = await axios.get(url + "/api/collection/list");
      setCollectionList(response.data.data);
    } catch (error) {
      console.error("Failed to fetch collection list:", error);
    }
  };

  // Add a new collection
  const addCollection = async (collectionData) => {
    try {
      const response = await axios.post(
        url + "/api/collection/add",
        collectionData
      );
      if (response.data.success) {
        setCollectionList([...collection_list, response.data.newCollection]);
      }
    } catch (error) {
      console.error("Failed to add collection:", error);
    }
  };

  // Initialize Google API for login
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
    fetchLocationList();
    fetchCollectionList(); // Fetch collection data
  }, []);

  // Context value
  const contextValue = {
    location_list,
    collection_list,
    url,
    addCollection,
    isLoggedIn,
    setIsLoggedIn,
    userProfile,
    setUserProfile,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
