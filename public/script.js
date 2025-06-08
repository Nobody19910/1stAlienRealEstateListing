const API_URL = '/api/listings';
// Start with an empty listing database
const listings = [];

// Display listings
// Fetch and display listings from backend
async function showListings() {
  const container = document.getElementById('listing-placeholder');
  container.innerHTML = "";
  try {
    const res = await fetch(API_URL);
    const listings = await res.json();

    if (listings.length === 0) {
      container.innerHTML = "<p>No listings available.</p>";
    } else {
      listings.forEach(listing => {
        const card = `
          <div class="property-card">
            <img src="${listing.image}" alt="${listing.title}" />
            <h3>${listing.title}</h3>
            <p>Location: ${listing.location}</p>
            <p>Price: ${listing.price}</p>
            <p>Type: ${listing.type}</p>
          </div>
        `;
        container.innerHTML += card;
      });
    }
    document.getElementById('form-container').classList.add('hidden');
    container.classList.remove('hidden');
  } catch (err) {
    container.innerHTML = "<p>Error loading listings.</p>";
  }
}

// Show Rent, Sell, or Buy Form
function openForm(type) {
  const formContainer = document.getElementById('form-container');
  const formTitle = document.getElementById('form-title');
  const listingPlaceholder = document.getElementById('listing-placeholder');
  let desiredTitle = "";

  if (type === 'rent') {
    desiredTitle = 'Rent Your Property';
  } else if (type === 'sell') {
    desiredTitle = 'Sell Your Property';
  } else if (type === 'buy') {
    desiredTitle = 'Buy a Property';
  }

  // If the form is already open for this type, close it
  if (!formContainer.classList.contains('hidden') && formTitle.innerText === desiredTitle) {
    formContainer.classList.add('hidden');
    listingPlaceholder.classList.remove('hidden');
    return;
  }

  // Otherwise, open the form for the selected type
  formTitle.innerText = desiredTitle;
  formContainer.classList.remove('hidden');
  listingPlaceholder.classList.add('hidden');
}

// Handle form submission to add a listing
// Add a new listing to backend
async function addListing(e) {
  e.preventDefault();
  const title = document.getElementById('listing-title').value;
  const location = document.getElementById('listing-location').value;
  const price = document.getElementById('listing-price').value;
  const type = document.getElementById('listing-type').value;
  const image = document.getElementById('listing-image').value || 'https://placehold.co/300x200?text=No+Image';

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, location, price, type, image }),
  });

  showListings();
  document.getElementById('form-container').classList.add('hidden');
  document.getElementById('listing-form').reset();
}

// Toggle navbar (mobile)
function toggleNav() {
  document.querySelector('.navbar').classList.toggle('active');
}

// Search listings
function searchListings(e) {
  e.preventDefault();
  const query = document.getElementById('searchInput').value.toLowerCase();
  const results = listings.filter(l => 
    l.title.toLowerCase().includes(query) ||
    l.location.toLowerCase().includes(query) ||
    l.type.toLowerCase().includes(query)
  );

  const container = document.getElementById('listing-placeholder');
  container.innerHTML = "";

  if (results.length === 0) {
    container.innerHTML = "<p>No matching listings found.</p>";
  } else {
    results.forEach(listing => {
      const card = `
        <div class="property-card">
          <img src="${listing.image}" alt="${listing.title}" />
          <h3>${listing.title}</h3>
          <p>Location: ${listing.location}</p>
          <p>Price: ${listing.price}</p>
          <p>Type: ${listing.type}</p>
        </div>
      `;
      container.innerHTML += card;
    });
  }

  document.getElementById('form-container').classList.add('hidden');
  container.classList.remove('hidden');
}

window.onload = showListings;