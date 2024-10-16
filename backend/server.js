import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import path from 'path';
import { fileURLToPath } from 'url';
import locationRouter from './routes/locationRouter.js';

// App configurations
const app = express();
const port = 4000;

// Get current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(express.json());
app.use(cors());

// DB connection
connectDB();

// API Endpoints
app.use("/api/location", locationRouter);
app.use("/images",express.static('uploads'))


app.get("/", (req, res) => {
    res.send("API working");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
