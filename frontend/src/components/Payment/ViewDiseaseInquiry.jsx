import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewDiseaseInquiry.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ViewDiseaseInquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // State for the search input
  const [startDate, setStartDate] = useState(''); // Date range start
  const [endDate, setEndDate] = useState(''); // Date range end
  const [locationFilter, setLocationFilter] = useState(''); // Province filter
  const [priorityFilter, setPriorityFilter] = useState(''); // Priority filter

  const [updatedInquiry, setUpdatedInquiry] = useState({
    farmerName: '',
    email: '',
    phone: '',
    inquiryDate: '',
    inquiryTopic: '',
    symptoms: '',
    area: '',
    location: '',
    priorityLevel: '',
    images: null,
  });



  // Fetch inquiries from the API
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/diseaseInquiry/list');
        setInquiries(response.data.data);
      } catch (error) {
        console.error('Error fetching inquiries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);


  // Filter inquiries based on the search query, date range, location, and priority
  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch = inquiry.farmerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate =
      (!startDate || new Date(inquiry.inquiryDate) >= new Date(startDate)) &&
      (!endDate || new Date(inquiry.inquiryDate) <= new Date(endDate));
    const matchesLocation = !locationFilter || inquiry.location.includes(locationFilter);
    const matchesPriority = !priorityFilter || inquiry.priorityLevel === priorityFilter;
    return matchesSearch && matchesDate && matchesLocation && matchesPriority;
  });

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setStartDate('');
    setEndDate('');
    setLocationFilter('');
    setPriorityFilter('');
  };

  // Delete inquiry handler
  const handleDelete = async (id) => {
    try {
      await axios.post('http://localhost:4000/api/diseaseInquiry/remove', { id });
      setInquiries(inquiries.filter((inquiry) => inquiry._id !== id));
    } catch (error) {
      console.error('Error deleting inquiry:', error);
    }
  };

  // Set the inquiry being edited
  const handleEdit = (inquiry) => {
    setEditingId(inquiry._id);
    setUpdatedInquiry({
      farmerName: inquiry.farmerName,
      email: inquiry.email,
      phone: inquiry.phone,
      inquiryDate: new Date(inquiry.inquiryDate).toISOString().substring(0, 10),
      inquiryTopic: inquiry.inquiryTopic,
      symptoms: inquiry.symptoms,
      area: inquiry.area,
      location: inquiry.location,
      priorityLevel: inquiry.priorityLevel,
      images: null,
    });
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      Object.keys(updatedInquiry).forEach((key) => {
        formData.append(key, updatedInquiry[key]);
      });

      await axios.put(`http://localhost:4000/api/diseaseInquiry/update/${editingId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update the inquiries state
      setInquiries((prevInquiries) =>
        prevInquiries.map((inquiry) => (inquiry._id === editingId ? { ...inquiry, ...updatedInquiry } : inquiry))
      );

      // Reset editing state and form
      setEditingId(null);
      setUpdatedInquiry({
        farmerName: '',
        email: '',
        phone: '',
        inquiryDate: '',
        inquiryTopic: '',
        symptoms: '',
        area: '',
        location: '',
        priorityLevel: '',
        images: null,
      });
    } catch (error) {
      console.error('Error updating inquiry:', error);
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedInquiry({ ...updatedInquiry, [name]: value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    setUpdatedInquiry({ ...updatedInquiry, images: e.target.files[0] });
  };


  // Report generation
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.text('Disease Inquiries Report', 14, 20);

    // Generate table data from inquiries
    const tableData = filteredInquiries.map((inquiry) => [
      inquiry.farmerName,
      inquiry.email,
      inquiry.phone,
      new Date(inquiry.inquiryDate).toLocaleDateString(),
      inquiry.inquiryTopic,
      inquiry.symptoms,
      inquiry.location,
      inquiry.priorityLevel,
    ]);

    // Add autoTable with columns and data
    doc.autoTable({
      head: [['Farmer Name', 'Email', 'Phone', 'Date', 'Topic', 'Symptoms', 'Location', 'Priority']],
      body: tableData,
      startY: 30,
      theme: 'grid',
      headStyles: { fillColor: [45, 106, 79] }, // Greenish color for the header
    });

    // Save the PDF
    doc.save('Disease_Inquiries_Report.pdf');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="view-inquiry-container">
      <h2 className='header45'>View Disease Inquiries</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by Farmer Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <div className="filter-container">
        {/* Date Range Filter */}
        <div className="date-filter">
          <div className='date-filter-start'>
            <label>Start Date:</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className='date-filter-end'>
            <label>End Date:</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>

        {/* Location Filter */}
        <div className="location-filter">
          <div>
            <label>Location (Province):</label>
            <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
              <option value="">All</option>
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
        </div>

        {/* Priority Filter */}
        <div className="priority-filter">
          <div>
            <label>Priority Level:</label>
            <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
              <option value="">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className='clear_btn'>
          <button onClick={handleClearFilters}>Clear Filters</button>
        </div>
      </div>
      {/* Print Inquiries Button */}
      <button onClick={generatePDF} className="print-button">Print Inquiries</button>

      <div className="inquiry-grid">
        {filteredInquiries.length > 0 ? (
          filteredInquiries.map((inquiry) => (
            <div key={inquiry._id} className="inquiry-card">
              {inquiry.images && (
                <img
                  src={`http://localhost:4000/images/${inquiry.images}`}
                  alt="Inquiry"
                  className="inquiry-image"
                />
              )}
              <div className="inquiry-details">
                <h3>{inquiry.farmerName}</h3>
                <p><strong>Email:</strong> {inquiry.email}</p>
                <p><strong>Phone:</strong> {inquiry.phone}</p>
                <p><strong>Inquiry Date:</strong> {new Date(inquiry.inquiryDate).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {inquiry.location}</p>
                <p><strong>Inquiry Topic:</strong> {inquiry.inquiryTopic}</p>
                <p><strong>Symptoms:</strong> {inquiry.symptoms}</p>
                <p><strong>Area:</strong> {inquiry.area}</p>
                <p><strong>Priority Level:</strong> {inquiry.priorityLevel}</p>
              </div>
              <div className="inquiry-actions">
                <button className='button98' onClick={() => handleEdit(inquiry)}>Edit</button>
                <button className='button98' onClick={() => handleDelete(inquiry._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No inquiries found.</p>
        )}
      </div>

      {editingId && (
        <div className="update-inquiry-form">
          <h3>Update Inquiry</h3>
          <div>
            <input
              type="text"
              name="farmerName"
              value={updatedInquiry.farmerName}
              onChange={handleChange}
              placeholder="Farmer Name"
            />
            <input
              type="email"
              name="email"
              value={updatedInquiry.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <input
              type="tel"
              name="phone"
              value={updatedInquiry.phone}
              onChange={handleChange}
              placeholder="Phone"
            />
            <input
              type="date"
              name="inquiryDate"
              value={updatedInquiry.inquiryDate}
              onChange={handleChange}
            />
            <input
              type="text"
              name="inquiryTopic"
              value={updatedInquiry.inquiryTopic}
              onChange={handleChange}
              placeholder="Inquiry Topic"
            />
            <textarea
              name="symptoms"
              value={updatedInquiry.symptoms}
              onChange={handleChange}
              placeholder="Symptoms"
            />
            <input
              type="text"
              name="area"
              value={updatedInquiry.area}
              onChange={handleChange}
              placeholder="Area"
            />
            <input
              type="text"
              name="location"
              value={updatedInquiry.location}
              onChange={handleChange}
              placeholder="Location"
            />
            <input
              type="text"
              name="priorityLevel"
              value={updatedInquiry.priorityLevel}
              onChange={handleChange}
              placeholder="Priority Level"
            />
            <input type="file" name="images" onChange={handleImageChange} />

            <button onClick={handleUpdate}>Update Inquiry</button>
            <button onClick={() => setEditingId(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDiseaseInquiry;
