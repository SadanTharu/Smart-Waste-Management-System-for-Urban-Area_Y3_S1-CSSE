import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [location_list, setLocationList] = useState([]);
  const [collection_list, setCollectionList] = useState([]);

  const fetchLocationList = async () => {
    try {
      const response = await axios.get(url + "/api/location/list");
      setLocationList(response.data.data); // Corrected function usage here
    } catch (error) {
      console.error("Failed to fetch disease list:", error);
    }
  };
  const fetchCollectionList = async () => {
    try {
      const response = await axios.get(url + "/api/collection/list");
      setCollectionList(response.data.data);
    } catch (error) {
      console.error("Failed to fetch collection list:", error);
    }
  };
  // Add new collection
  const addCollection = async (collectionData) => {
    try {
      const response = await axios.post(
        url + "/api/collection/add",
        collectionData
      );
      if (response.data.success) {
        // Update the local state with the newly added collection
        setCollectionList([...collection_list, response.data.newCollection]);
      }
    } catch (error) {
      console.error("Failed to add collection:", error);
    }
  };

  useEffect(() => {
    fetchLocationList();
    fetchCollectionList(); // Fetch collection data
  }, []);

  const contextValue = {
    location_list,
    url,
    collection_list, // Add collection data to the context
    addCollection, // Add collection handler function
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
