const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Replace with your Atlas connection string
mongoose.connect('mongodb+srv://niiniinn86:password%40100mongodb@1stalienrealestate.8exjxgp.mongodb.net/?retryWrites=true&w=majority&appName=1stAlienRealEstate');

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

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));