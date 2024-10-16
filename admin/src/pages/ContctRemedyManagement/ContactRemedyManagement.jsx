import React, { useState } from "react";
import "./ContactRemedyManagement.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const ContactRemedyManagement = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    newDiseaseName: "",
    symptoms: "",
    severityLevel: 5,
    category: "bacterial blind",
    recomendedTreatment: "", // Ensure that the default value matches one of the options
  });

  const treatments = [
    "Tricyclazole",
    "Isoprothiolane",
    "Carbendazim",
    "Azoxystrobin",
    "Validamycin",
    "Tebuconazole",
    "Mancozeb",
    "Propiconazole",
    "Copper-based Bactericides",
    "Thiophanate-methyl",
    "Difenoconazole",
  ];

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("newDiseaseName", data.newDiseaseName);
    formData.append("symptoms", data.symptoms);
    formData.append("severityLevel", Number(data.severityLevel));
    formData.append("category", data.category);
    formData.append("recomendedTreatment", data.recomendedTreatment);
    formData.append("image", image);

    const response = await axios.post(
      `${url}/api/contactRemedy/addDataForRemedy`,
      formData
    );
    if (response.data.success) {
      setData({
        newDiseaseName: "",
        symptoms: "",
        severityLevel: 5,
        category: "D2",
        recomendedTreatment: "",
      });

      setImage(null);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
          <p>Upload Affected Area's Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Uploaded preview"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            name="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Enter Disease Name</p>
          <input
            onChange={onChangeHandler}
            value={data.newDiseaseName}
            type="text"
            name="newDiseaseName"
            placeholder="Enter newly discovered disease name here"
            required
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Predicted Symptoms of Disease</p>
          <textarea
            onChange={onChangeHandler}
            value={data.symptoms}
            name="symptoms"
            rows="6"
            placeholder="Write Predicted Symptoms of Disease"
            required
          />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Enter suggested Disease Category</p>
            <select
              onChange={onChangeHandler}
              name="category"
              value={data.category}
              required
            >
              <option value="BacterialBlind">Bacterial Blind</option>
              <option value="bacterialLeafSteak">Bacterial Leaf Steak</option>
              <option value="brownSpot">Brown Spot</option>
              <option value="raggedStunt">Ragged Stunt</option>
              <option value="riceBlast">Rice Blast</option>
              <option value="tungro">Tungro</option>
            </select>
          </div>
        </div>
        <div className="add-severity flex-col">
          <p>Severity Level of the Disease</p>
          <input
            type="range"
            name="severityLevel"
            min="1"
            max="10"
            value={data.severityLevel}
            onChange={onChangeHandler}
            className="slider"
          />
          <span>{data.severityLevel}</span>
        </div>
        <div className="add-price flex-col">
          <p>Recommended Treatment For the Disease</p>
          <select
            onChange={onChangeHandler}
            name="recomendedTreatment"
            value={data.recomendedTreatment}
            required
          >
            <option value="">Select a treatment</option>
            {treatments.map((treatment, index) => (
              <option key={index} value={treatment}>
                {treatment}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="add-btn">
          Add Data to System
        </button>
      </form>
    </div>
  );
};

export default ContactRemedyManagement;
