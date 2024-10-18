import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [location_list, setLocationList] = useState([]);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(null); // Add userId state

  const fetchLocationList = async () => {
    try {
      const response = await axios.get(url + "/api/location/list");
      setLocationList(response.data.data);
    } catch (error) {
      console.error("Failed to fetch location list:", error);
    }
  };

  const fetchUserIdFromToken = async (token) => {
    if (token) {
      try {
        const response = await axios.get(`${url}/api/user/getuser`, {
          headers: {
            Authorization: token,
          },
        });
        console.log("Fetched user data:", response.data); // Log the response
        setUserId(response.data.user._id); // Set the user ID from the response
      } catch (error) {
        console.error("Failed to fetch user ID:", error);
      }
    } else {
      console.log("No token found");
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchLocationList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await fetchUserIdFromToken(storedToken); // Fetch user ID when token is set
      }
    }
    loadData();
  }, []);

  const contextValue = {
    location_list,
    url,
    token,
    setToken,
    userId, // Provide userId to context
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
