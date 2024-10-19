import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
//import Disease from "./pages/Disease/Disease";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Location from "./pages/Location/Location";
import AddLocation from "./pages/AddLocation/AddLocation";
import LocationList from "./pages/LocationList/LocationList";
import UpdateLocation from "./pages/UpdateLocation/UpdateLocation";
import CollectionRequests from "./pages/CollectionRequests/collectionRequest";

import GarbageBins from "./pages/GarbageBins/GarbageBins";
import FullGarbageBins from "./pages/fullbins/fullbins";
import ScanGarbageBins from './pages/scanbin/scanbin';

const App = () => {
  const url = "http://localhost:4000";

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/location" element={<Location url={url} />} />
          <Route path="/addlocation" element={<AddLocation url={url} />} />
          <Route path="/list" element={<LocationList url={url} />} />
          <Route path="/update/:id" element={<UpdateLocation />} />{" "}
          <Route path="/collection" element={<CollectionRequests />} />

          <Route path="/bins" element={<GarbageBins url={url} />} />
          <Route path="/fullbins" element={<FullGarbageBins url={url} />} />
          <Route path="/scanbins" element={<ScanGarbageBins url={url} />} />

        </Routes>
      </div>
    </div>
  );
};

export default App;
