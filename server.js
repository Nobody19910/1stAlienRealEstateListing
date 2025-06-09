const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the public folder
app.use(express.static(__dirname));

// Use environment variable for MongoDB URI (recommended for Render)
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb+srv://niiniinn86:password%40100mongodb@cluster0.hlvqz98.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
);

// Define Listing schema and model
const listingSchema = new mongoose.Schema({
  title: String,
  location: String,
  price: String,
  type: String,
  image: String,
});
const Listing = mongoose.model('Listing', listingSchema);

// Get all listings
app.get('/api/listings', async (req, res) => {
  const listings = await Listing.find();
  res.json(listings);
});

// Add a new listing
app.post('/api/listings', async (req, res) => {
  const listing = new Listing(req.body);
  await listing.save();
  res.json(listing);
});
// Serve the index.html file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Use environment variable for port (Render sets PORT)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));