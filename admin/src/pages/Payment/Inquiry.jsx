import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Inquiry.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 

const ViewInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredInquiries, setFilteredInquiries] = useState([]);
  
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [priority, setPriority] = useState('');

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/diseaseInquiry/list');
        if (response.data.success) {
          setInquiries(response.data.data);
          setFilteredInquiries(response.data.data); // Initialize with all inquiries
        } else {
          console.error('Error fetching inquiries');
        }
      } catch (error) {
        console.error('Server Error:', error);
      }
    };

    fetchInquiries();
  }, []);

  // Handle search by name
  useEffect(() => {
    const searchResults = inquiries.filter(inquiry =>
      inquiry.farmerName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    filterInquiries(searchResults);
  }, [searchQuery, inquiries]);

  // Function to delete a disease inquiry
  const deleteInquiry = async (id) => {
    try {
      const response = await axios.post('http://localhost:4000/api/diseaseInquiry/remove', { id });
      if (response.data.success) {
        setInquiries(inquiries.filter(inquiry => inquiry._id !== id)); // Remove the deleted inquiry from state
        alert('Inquiry deleted successfully');
      } else {
        console.error('Error deleting inquiry');
      }
    } catch (error) {
      console.error('Server Error:', error);
    }
  };

  // Filter function based on selected criteria
  const filterInquiries = (inquiriesToFilter) => {
    let filtered = inquiriesToFilter;

    if (startDate && endDate) {
      filtered = filtered.filter(inquiry => {
        const inquiryDate = new Date(inquiry.inquiryDate);
        return inquiryDate >= new Date(startDate) && inquiryDate <= new Date(endDate);
      });
    }

    if (location) {
      filtered = filtered.filter(inquiry => inquiry.location === location);
    }

    if (priority) {
      filtered = filtered.filter(inquiry => inquiry.priorityLevel === priority);
    }

    setFilteredInquiries(filtered);
  };

  // Trigger filter on filter inputs change
  useEffect(() => {
    filterInquiries(inquiries);
  }, [startDate, endDate, location, priority, inquiries]);

  // Function to clear all filters
  const clearFilters = () => {
    setStartDate('');
    setEndDate('');
    setLocation('');
    setPriority('');
    setFilteredInquiries(inquiries); // Reset to the original data
  };

  // Function to generate PDF report
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Disease Inquiries Report', 14, 20);

    const tableColumn = [
      "Farmer Name",
      "Email",
      "Phone",
      "Inquiry Date",
      "Location",
      "Inquiry Topic",
      "Symptoms",
      "Area",
      "Priority Level",
    ];

    const tableRows = [];

    filteredInquiries.forEach(inquiry => {
      const inquiryData = [
        inquiry.farmerName,
        inquiry.email,
        inquiry.phone,
        new Date(inquiry.inquiryDate).toLocaleDateString(),
        inquiry.location,
        inquiry.inquiryTopic,
        inquiry.symptoms,
        inquiry.area,
        inquiry.priorityLevel,
      ];
      tableRows.push(inquiryData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 30 });
    doc.save('Disease_Inquiries_Report.pdf');
  };

  return (
    <div>
      <h2>All Disease Inquiries</h2>

      {/* Search Input */}
      <div>
        <input
          type="text"
          placeholder="Search by Farmer Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filters Section */}
      <div className="filters">
        {/* Date Range Filter */}
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Location Filter */}
        <div>
          <label>Location:</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">All Provinces</option>
            <option value="Central">Central</option>
              <option value="Eastern">Eastern</option>
              <option value="Northern">Northern</option>
              <option value="North Western">North Western</option>
              <option value="North Central">North Central</option>
              <option value="Sabaragamuwa">Sabaragamuwa</option>
              <option value="Southern">Southern</option>
              <option value="Uva">Uva</option>
              <option value="Western">Western</option>
            
          </select>
        </div>

        {/* Priority Level Filter */}
        <div>
          <label>Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        <div>
          <button onClick={clearFilters}>Clear Filters</button>
        </div>
      </div>

      {/* Print Inquiries Button */}
      <div>
        <button className='btn-print' onClick={generatePDF}>Print Inquiries</button>
      </div>

      {/* Table Displaying Filtered Inquiries */}
      <table border="1">
        <thead>
          <tr>
            <th>Farmer Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Inquiry Date</th>
            <th>Location</th>
            <th>Inquiry Topic</th>
            <th>Symptoms</th>
            <th>Area</th>
            <th>Priority Level</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInquiries.map((inquiry, index) => (
            <tr key={index}>
              <td>{inquiry.farmerName}</td>
              <td>{inquiry.email}</td>
              <td>{inquiry.phone}</td>
              <td>{new Date(inquiry.inquiryDate).toLocaleDateString()}</td>
              <td>{inquiry.location}</td>
              <td>{inquiry.inquiryTopic}</td>
              <td>{inquiry.symptoms}</td>
              <td>{inquiry.area}</td>
              <td>{inquiry.priorityLevel}</td>
              <td>
                {inquiry.images ? (
                  <img
                    src={`http://localhost:4000/uploads/${inquiry.images}`}
                    alt="Disease"
                    width="100"
                    height="100"
                  />
                ) : (
                  'No Image'
                )}
              </td>
              <td>
                <button onClick={() => deleteInquiry(inquiry._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewInquiries;
