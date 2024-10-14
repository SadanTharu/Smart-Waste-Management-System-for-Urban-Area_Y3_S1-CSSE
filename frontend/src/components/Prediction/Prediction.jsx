import React, { useState } from "react";
import "./Prediction.css";
import axios from "axios";
import { toast } from "react-toastify";

const Prediction = () => {
  const url = "http://localhost:5000";

  const [data, setData] = useState({
    Year: "",
    average_rain_fall_mm_per_year: "",
    pesticides_tonnes: "",
    avg_temp: "",
    Area: "",
    Item: "",
  });

  const [prediction, setPrediction] = useState(null);

  const countries = [
    "Albania",
    "Algeria",
    "Angola",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Belarus",
    "Belgium",
    "Botswana",
    "Brazil",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chile",
    "Colombia",
    "Croatia",
    "Denmark",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Eritrea",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Ghana",
    "Greece",
    "Guatemala",
    "Guinea",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "India",
    "Indonesia",
    "Iraq",
    "Ireland",
    "Italy",
    "Jamaica",
    "Japan",
    "Kazakhstan",
    "Kenya",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Libya",
    "Lithuania",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Mali",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Norway",
    "Pakistan",
    "Papua New Guinea",
    "Peru",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Rwanda",
    "Saudi Arabia",
    "Senegal",
    "Slovenia",
    "South Africa",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Tajikistan",
    "Thailand",
    "Tunisia",
    "Turkey",
    "Uganda",
    "Ukraine",
    "United Kingdom",
    "Uruguay",
    "Zambia",
    "Zimbabwe",
  ];

  const crops = [
    "Maize",
    "Potatoes",
    "Rice, paddy",
    "Sorghum",
    "Soybeans",
    "Wheat",
    "Cassava",
    "Sweet potatoes",
    "Plantains and others",
    "Yams",
  ];

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formattedData = {
      Year: parseFloat(data.Year),
      average_rain_fall_mm_per_year: parseFloat(
        data.average_rain_fall_mm_per_year
      ),
      pesticides_tonnes: parseFloat(data.pesticides_tonnes),
      avg_temp: parseFloat(data.avg_temp),
      Area: data.Area,
      Item: data.Item,
    };

    try {
      const response = await axios.post(`${url}/predict`, formattedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        setPrediction(response.data.prediction);
        toast.success(`Predicted Yield: ${response.data.prediction}`);
        setData({
          Year: "",
          average_rain_fall_mm_per_year: "",
          pesticides_tonnes: "",
          avg_temp: "",
          Area: "",
          Item: "",
        });
      } else {
        toast.error("Failed to get prediction.");
      }
    } catch (error) {
      toast.error(
        "An error occurred while predicting the yield. Please try again."
      );
      console.error(error);
    }
  };

  return (
    <div className="prediction" id="prediction">
      <h1>Crop Yield Prediction</h1>
      <form className="formcss" onSubmit={onSubmitHandler}>
        <div className="formside">
          <p>Year</p>
          <input
            onChange={onChangeHandler}
            value={data.Year}
            type="number"
            name="Year"
            placeholder="Enter Year"
            required
          />
        </div>
        <div className="formside">
          <p>Average Rainfall (mm/year)</p>
          <input
            onChange={onChangeHandler}
            value={data.average_rain_fall_mm_per_year}
            type="number"
            name="average_rain_fall_mm_per_year"
            placeholder="Average Rainfall (mm)"
            required
          />
        </div>
        <div className="formside">
          <p>Pesticides (tonnes)</p>
          <input
            onChange={onChangeHandler}
            value={data.pesticides_tonnes}
            type="number"
            name="pesticides_tonnes"
            placeholder="Pesticides (tonnes)"
            required
          />
        </div>
        <div className="formside">
          <p>Average Temperature (°C)</p>
          <input
            onChange={onChangeHandler}
            value={data.avg_temp}
            type="number"
            name="avg_temp"
            placeholder="Average Temperature (°C)"
            required
          />
        </div>
        <div className="formside">
          <p>Area (Country)</p>
          <select
            onChange={onChangeHandler}
            name="Area"
            value={data.Area}
            required
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="formside">
          <p>Item (Crop)</p>
          <select
            onChange={onChangeHandler}
            name="Item"
            value={data.Item}
            required
          >
            <option value="">Select Crop</option>
            {crops.map((crop) => (
              <option key={crop} value={crop}>
                {crop}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="add-btn">
          Predict
        </button>
        {prediction && (
          <div className="prediction-result">
            <h3>Predicted Yield: {prediction}</h3>
          </div>
        )}
      </form>
    </div>
  );
};

export default Prediction;
