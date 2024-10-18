import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom"; // Ensure Route is imported
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import DiseaseInquiry from "./components/Payment/DiseaseInquiry";
import ViewDiseaseInquiry from "./components/Payment/ViewDiseaseInquiry";
import BankDetails from "./components/Payment/MakePayment";
import ViewBankDetails from "./components/Payment/ViewPayments";
import CalPayment from "./components/Payment/CalPayment";
import Payment from "./components/Payment/Payment";
const App = () => {
  const url = "http://localhost:4000";

  return (
    <>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Sure na */}
          <Route path="/inquiry" element={<DiseaseInquiry/>} />
          <Route path="/viewInquiry" element={<ViewDiseaseInquiry/>} />
          <Route path="/bankDetails" element={<BankDetails/>} />
          <Route path="/viewPayment" element={<ViewBankDetails/>} />
          <Route path="/calPayment" element={<CalPayment/>} />

          {/* video eken balan gahana ekata */}
          <Route path="/payment" element={<Payment/>}/>

        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
