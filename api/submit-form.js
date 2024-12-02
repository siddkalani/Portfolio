const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import CORS middleware

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5002;

// CORS configuration options
const corsOptions = {
    origin: ["https://creaovate.netlify.app","http://127.0.0.1:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type"], // Allowed headers
    credentials: true, // If you need to send cookies or authentication headers
};

// Apply CORS middleware with options
app.use(cors(corsOptions));

// If using Express 4.16+ you can use express.json() instead of bodyParser.json()
app.use(bodyParser.json());

console.log(`Backend Server Port: ${process.env.PORT || 5002}`);

// MongoDB connection
async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

connectToDatabase();

// Define the Schema and Model
const FormSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, required: true },
    service: { type: String, required: true },
    message: { type: String, required: true },
    phone: { type: String },
});

const Form = mongoose.model("Form", FormSchema);

// API Endpoint
app.post("/api/submit-form", async (req, res) => {
    try {
        const { name, email, company, service, message, phone } = req.body;

        console.log("Request body:", req.body); // Debugging

        if (!name || !email || !company || !service || !message) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const formData = new Form({ name, email, company, service, message, phone });
        await formData.save();

        res.status(200).json({ message: "Form submitted successfully!" });
    } catch (error) {
        console.error("Error saving form data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// Handle undefined routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
