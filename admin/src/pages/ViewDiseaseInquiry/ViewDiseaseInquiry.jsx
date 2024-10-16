import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewDiseaseInquiry.css";
import jsPDF from "jspdf"; // Import jsPDF for PDF generation
import "jspdf-autotable"; // Import jsPDF plugin for table formatting

//disabled display image part
/*
   {inquiry.images ? (
    <img
      src={`${url}/images/${inquiry.images}`}
      alt="Inquiry"
      className="disease-in-inquiry-image"
    />
  ) : (
    <p>No Image Available</p>
  )}
*/

const ViewDiseaseInquiry = ({ url }) => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch the list of disease inquiries
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get(`${url}/api/diseaseInquiry/list`);
        setInquiries(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the inquiries:", error);
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [url]);

  // Search function to filter inquiries based on farmer name or inquiry topic
  const filteredInquiries = inquiries.filter(
    (inquiry) =>
      inquiry.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.inquiryTopic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to generate report as PDF
  const generateReport = () => {
    const doc = new jsPDF();
    doc.text("Disease Inquiries Report", 20, 10);
    doc.autoTable({
      head: [
        ["Farmer Name", "Email", "Phone", "Inquiry Date", "Location", "Topic"],
      ],
      body: filteredInquiries.map((inquiry) => [
        inquiry.farmerName,
        inquiry.email,
        inquiry.phone,
        new Date(inquiry.inquiryDate).toLocaleDateString(),
        inquiry.location,
        inquiry.inquiryTopic,
      ]),
    });
    doc.save("disease_inquiries_report.pdf");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="disease-in-view-inquiry-container">
      <h3>View Disease Inquiries</h3>

      {/* Search Bar */}
      <div className="disease-in-search-bar">
        <input
          type="text"
          placeholder="Search by farmer name or inquiry topic"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={generateReport}>Generate Report</button>
      </div>

      {/* Inquiry List */}
      <div className="disease-in-inquiry-grid">
        {filteredInquiries.length > 0 ? (
          filteredInquiries.map((inquiry) => (
            <div key={inquiry._id} className="disease-in-inquiry-card">
              {/* Display image if available */}

              <div className="disease-in-inquiry-details">
                <h3>{inquiry.farmerName}</h3>
                <p>
                  <strong>Email:</strong> {inquiry.email}
                </p>
                <p>
                  <strong>Phone:</strong> {inquiry.phone}
                </p>
                <p>
                  <strong>Inquiry Date:</strong>{" "}
                  {new Date(inquiry.inquiryDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Location:</strong> {inquiry.location}
                </p>
                <p>
                  <strong>Inquiry Topic:</strong> {inquiry.inquiryTopic}
                </p>
                <p className="symptoms">
                  <strong>Symptoms:</strong> {inquiry.symptoms}
                </p>
                <p>
                  <strong>Area:</strong> {inquiry.area}
                </p>
                <p className="priority-level">
                  <strong>Priority Level:</strong> {inquiry.priorityLevel}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No inquiries found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewDiseaseInquiry;
