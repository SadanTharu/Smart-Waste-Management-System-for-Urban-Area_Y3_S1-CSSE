import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import "./BinRequest.css";
import { useNavigate } from 'react-router-dom';
import { StoreContext } from "../../context/StoreContext"; // Import StoreContext to access login state and user profile

const BinRequest = ({ url }) => {
  const [bins, setBins] = useState([]);  // State to store bin data
  const [quantities, setQuantities] = useState({});  // State to store quantities of bins selected
  const [totalCost, setTotalCost] = useState(0);  // State to store total cost of selected bins
  const { isLoggedIn, userProfile } = useContext(StoreContext); // Access login status and user profile from StoreContext
  const navigate = useNavigate();

  // Fetch available bins on component mount
  useEffect(() => {
    const fetchBins = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/garbagebin/list'); // API call to fetch garbage bins
        if (response.data.success) {
          setBins(response.data.data);  // Set fetched bin data to bins state

          const initialQuantities = response.data.data.reduce((acc, bin) => {
            acc[bin._id] = 0;  // Initialize quantity to 0 for each bin
            return acc;
          }, {});
          setQuantities(initialQuantities);  // Set initial quantities
        } else {
          console.error('Failed to fetch bins:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching bins:', error);
      }
    };

    fetchBins();  // Call function to fetch bins
  }, []);

  // Handle changes in bin quantities
  const handleQuantityChange = (id, change) => {
    const newQuantity = quantities[id] + change;  // Calculate new quantity based on change
    if (newQuantity >= 0) {  // Ensure quantity doesn't go below 0
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [id]: newQuantity,  // Update quantities state
      }));
    }
  };

  // Recalculate total cost when quantities or bins data change
  useEffect(() => {
    const newTotalCost = bins.reduce((acc, bin) => {
      return acc + (bin.price * quantities[bin._id]);  // Sum up cost for selected bins
    }, 0);
    setTotalCost(newTotalCost);  // Update total cost state
  }, [quantities, bins]);

  // Handle checkout button click
  const handleCheckout = () => {
    if (!isLoggedIn) {  // If user is not logged in, show alert and redirect to login page
      alert("Please log in to proceed.");
      navigate("/");  // Redirect to login page
      return;
    }

    // Prepare selected bin items for checkout
    const selectedItems = bins.filter(bin => quantities[bin._id] > 0).map(bin => ({
      id: bin._id,
      wasteType: bin.wasteType,
      capacity: bin.capacity,
      quantity: quantities[bin._id],
      price: bin.price,
    }));

    // Create checkout data including selected bins, total cost, and user profile
    const checkoutData = {
      selectedItems: selectedItems,
      totalCost: totalCost,
      user: userProfile,  // Use actual user profile from StoreContext
    };

    // Navigate to the checkout page and pass checkout data
    navigate("/checkout", { state: { checkoutData } });
  };

  return (
    <div className="bin-request" id='BinRequest'>
      <h1>Available Garbage Bins for Purchase</h1>
      {bins.length > 0 ? (  // Render bin list if bins are available
        <ul>
          {bins.map((bin) => (
            <li key={bin._id}>
              <h2>{bin.wasteType}</h2>
              <p>Capacity: {bin.capacity}L</p>
              <img src={`http://localhost:4000/${bin.binimage}`} className='imagepromoList' alt="Garbage Bin" />
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(bin._id, -1)}>-</button>
                <span>{quantities[bin._id]}</span>
                <button onClick={() => handleQuantityChange(bin._id, 1)}>+</button>
              </div>
              <p>Price: ${bin.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bins available at the moment.</p>  // Show message if no bins are available
      )}
      <h3>Total Cost: ${totalCost}</h3>  {/* Display total cost */}
      <button onClick={handleCheckout}>Proceed to Checkout</button>  {/* Checkout button */}
    </div>
  );
};

export default BinRequest;
