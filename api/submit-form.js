const mongoose = require("mongoose");
require("dotenv").config();

let cachedDb = null;

// MongoDB connection
async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const uri = process.env.MONGO_URI;
  const client = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  cachedDb = client.connection;
  return cachedDb;
}

// MongoDB schema
const FormSchema = new mongoose.Schema({
  name: String,
  email: String,
  company: String,
  service: String,
  message: String,
  phone: String,
});
const Form = mongoose.models.Form || mongoose.model("Form", FormSchema);

// API handler function
module.exports = async (req, res) => {
  if (req.method === "POST") {
    try {
      // Connect to database
      await connectToDatabase();

      // Create a new form entry
      const formData = new Form(req.body);
      await formData.save();

      res.status(200).json({ message: "Form submitted successfully!" });
    } catch (error) {
      console.error("Error submitting form:", error);
      res.status(500).json({ error: "Failed to submit form" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};
