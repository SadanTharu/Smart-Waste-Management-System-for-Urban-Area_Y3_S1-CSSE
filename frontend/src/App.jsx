import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom"; // Ensure Route is imported
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Login from "./components/login";
import Logout from "./components/logout";
import { gapi } from "gapi-script";

const clientId =
  "190098913382-cgc12ml4nme8u32kjgumdcm50nhsc28g.apps.googleusercontent.com";

const App = () => {
  useEffect(() => {
    // Initialize the Google API client
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  return (
    <>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
