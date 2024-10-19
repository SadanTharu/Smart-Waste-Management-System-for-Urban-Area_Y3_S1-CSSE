import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import BankDetails from "./components/Payment/MakePayment";
import CalPayment from "./components/Payment/CalPayment";


const App = () => {
  const url = "http://localhost:4000";

  return (
    <>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pay" element={<BankDetails/>} />
          <Route path="/calPay" element={<CalPayment/>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
