
const map = L.map('pakistan-map').setView([30.3753, 69.3451], 6);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


async function loadLocations() {
  try {
    const response = await fetch('./data/locations.json');
    const locations = await response.json();
  
    locations.forEach(location => {
      const marker = L.marker([location.lat, location.lng])
        .addTo(map)
        .bindPopup(`
          <div class="popup-content">
            <h3>${location.name}</h3>
            <img src="${location.thumbnail}" alt="${location.name}" class="popup-image">
            <p>${location.shortDescription}</p>
            <button class="view-details" data-id="${location.id}">View Details</button>
          </div>
        `);
        
      marker.on('click', function() {
        highlightLocation(location.id);
      });
    });
    
    // Add event listeners
    document.querySelectorAll('.view-details').forEach(button => {
      button.addEventListener('click', (e) => {
        const locationId = e.target.getAttribute('data-id');
        showLocationDetails(locationId);
      });
    });
    
  } catch (error) {
    console.error('Error loading locations:', error);
    document.getElementById('map-error').textContent = 'Failed to load map data. Please try again later.';
  }
}


function highlightLocation(locationId) {
  // Remove prev
  document.querySelectorAll('.location-card').forEach(card => {
    card.classList.remove('active');
  });

  const selectedCard = document.querySelector(`.location-card[data-id="${locationId}"]`);
  if (selectedCard) {
    selectedCard.classList.add('active');
    selectedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

document.addEventListener('DOMContentLoaded', loadLocations);
