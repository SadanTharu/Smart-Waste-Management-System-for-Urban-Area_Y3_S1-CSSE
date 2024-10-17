import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard/Dashboard";
//import Disease from "./pages/Disease/Disease";
import CollectionRecordDashboard from "./pages/CollectionRecord/CollectionRecordDashboard";
import ViewAllRecords from "./pages/CollectionRecord/ViewAllRecords";
import IssueView from "./pages/CollectionRecord/IssueView";
import AddNewUser from "./pages/User/AddNewUser";
import UserList from "./pages/User/UserList";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Location from "./pages/Location/Location";
import AddLocation from "./pages/AddLocation/AddLocation";
import LocationList from "./pages/LocationList/LocationList";
import UpdateLocation from "./pages/UpdateLocation/UpdateLocation";

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
          <Route path="/list" element={<LocationList url={url} />} />
          <Route path="/update/:id" element={<UpdateLocation />} />{" "}


          <Route path="/CollectionRecordDashboard" element={<CollectionRecordDashboard url={url} />} />
          <Route path="/ViewAllRecords" element={<ViewAllRecords url={url} />} />
          <Route path="/IssueView" element={<IssueView url={url} />} />
          <Route path="/AddNewUser" element={<AddNewUser />} />
          <Route path="/UserList" element={<UserList />} />
          {/* Update Page */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
