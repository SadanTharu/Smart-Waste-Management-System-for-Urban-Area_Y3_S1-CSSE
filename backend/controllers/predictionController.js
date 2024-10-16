import axios from 'axios';

const FLASK_API_URL = 'http://localhost:5000/predict'; // Update with your Flask URL if different

export const predictCropYield = async (req, res) => {
  try {
    const response = await axios.post(FLASK_API_URL, req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error predicting crop yield:', error);
    res.status(500).json({ error: 'Prediction failed' });
  }
};
