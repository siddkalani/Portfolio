const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas connectio
const uri = "mongodb+srv://admin:admin@portfolio.swr5h.mongodb.net/?retryWrites=true&w=majority&appName=portfolio";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((err) => console.log(err));

// Define a schema and model
const FormSchema = new mongoose.Schema({
  name: String,
  email: String,
  company: String,
  service: String,
  message: String,
  phone: String,
});
const Form = mongoose.model("Form", FormSchema);

// API route to handle form submission
app.post("/submit-form", async (req, res) => {
  try {
    const formData = new Form(req.body);
    await formData.save();
    res.status(200).send({ message: "Form submitted successfully!" });
  } catch (err) {
    res.status(500).send({ error: "Failed to submit form" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
