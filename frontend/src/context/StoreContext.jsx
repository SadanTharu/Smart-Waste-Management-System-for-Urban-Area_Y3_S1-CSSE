import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [location_list, setLocationList] = useState([]);

  const fetchLocationList = async () => {
    try {
      const response = await axios.get(url + "/api/location/list");
      setLocationList(response.data.data); // Corrected function usage here
    } catch (error) {
      console.error("Failed to fetch disease list:", error);
    }
  };

  useEffect(() => {
    fetchLocationList();
  }, []);

  const contextValue = {
    location_list,
    url,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
