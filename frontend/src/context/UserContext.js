// UserContext.js
import React, { createContext, useState, useContext } from 'react';

// Create User Context
const UserContext = createContext();

// Custom hook to use UserContext
export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile, isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
