import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation
import "./BinRequest.css";

const BinRequest = () => {
  const [bins, setBins] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBins = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/garbagebin/list');
        if (response.data.success) {
          setBins(response.data.data);

          const initialQuantities = response.data.data.reduce((acc, bin) => {
            acc[bin._id] = 0;
            return acc;
          }, {});
          setQuantities(initialQuantities);
        } else {
          console.error('Failed to fetch bins:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching bins:', error);
      }
    };

    fetchBins();
  }, []);

  const handleQuantityChange = (id, change) => {
    const newQuantity = quantities[id] + change;
    if (newQuantity >= 0) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [id]: newQuantity,
      }));
    }
  };

  useEffect(() => {
    const newTotalCost = bins.reduce((acc, bin) => {
      return acc + (bin.price * quantities[bin._id]);
    }, 0);
    setTotalCost(newTotalCost);
  }, [quantities, bins]);

  const handleCheckout = () => {
    navigate.push({
      pathname: '/payment',
      state: { totalCost, bins, quantities },
    });
  };

  return (
    <div className="bin-request">
      <h1>Available Garbage Bins for Purchase</h1>
      {bins.length > 0 ? (
        <ul>
          {bins.map((bin) => (
            <li key={bin._id}>
              <h2>{bin.wasteType}</h2>
              <p>Capacity: {bin.capacity}L</p>
              <img src={`http://localhost:4000/${bin.binimage}`} alt="Garbage Bin" />
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(bin._id, -1)}>-</button>
                <span>{quantities[bin._id]}</span>
                <button onClick={() => handleQuantityChange(bin._id, 1)}>+</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No garbage bins available for purchase at the moment.</p>
      )}
      <h3>Total Cost: ${totalCost}</h3>
      <button onClick={handleCheckout} disabled={totalCost === 0}>Proceed to Payment</button>
    </div>
  );
};

export default BinRequest;
