import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import AddNewWasteCollection from "./pages/Collectors/AddNewWasteCollection";
import ReportIssues from "./pages/Collectors/ReportIssues";
import DisplayCollectionRecords from "./pages/Collectors/DisplayCollectionRecords";
import UpdateWasteCollection from "./pages/Collectors/UpdateWasteCollection";
import IssueList from "./pages/Collectors/IssueList";
import UpdateReportIssue from "./pages/Collectors/UpdateReportIssue";
import WasteHome from "./pages/Collectors/WasteHome";


const App = () => {
  const url = "http://localhost:4000";

  return (
    <>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addnewwastecollection" element={<AddNewWasteCollection />} />
          <Route path="/DisplayCollectionRecords" element={<DisplayCollectionRecords />} />
          <Route path="/UpdateWasteCollection/:id" element={<UpdateWasteCollection />} />
          <Route path="/ReportIssues" element={<ReportIssues />} />  
          <Route path="/WasteHome" element={<WasteHome />} /> 
          <Route path="/IssueList" element={<IssueList />} /> 
          <Route path="/UpdateReportIssue/:id" element={<UpdateReportIssue />} />

        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
