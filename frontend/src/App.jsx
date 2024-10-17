import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom"; // Ensure Route is imported
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import DiseaseInquiry from "./components/Payment/DiseaseInquiry";
import ViewDiseaseInquiry from "./components/Payment/ViewDiseaseInquiry";
import BankDetails from "./components/Payment/MakePayment";
const App = () => {
  const url = "http://localhost:4000";

  return (
    <>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inquiry" element={<DiseaseInquiry/>} />
          <Route path="/viewInquiry" element={<ViewDiseaseInquiry/>} />
          <Route path="/payment" element={<BankDetails/>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
