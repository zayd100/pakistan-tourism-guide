# Shandar Safar - Pakistan Tourism Guide

A responsive web application showcasing Pakistan's beautiful destinations with an interactive map and image gallery.
(Prev)[prev.png]
## Overview

Shandar Safar (meaning "Beautiful Journey" in Urdu) is a tourism website I built during my early learning days to promote Pakistani destinations. The project combines my passion for travel with web development skills I was developing at the time.

## Features

- **Interactive Map**: Leaflet.js integration showing Pakistani destinations with clickable markers
- **Destination Gallery**: Filterable image gallery with categories (Mountains, Historical, Hill Stations, Cultural)
- **Lightbox Viewer**: Full-screen image slideshow with travel tips
- **Responsive Design**: Mobile-friendly layout
- **Donation Modal**: Ethereum address integration for supporting the project

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Mapping**: Leaflet.js for interactive maps
- **Icons**: Font Awesome
- **Data**: JSON-based location storage
- **Styling**: Custom CSS with responsive design

## Project Structure

```
shandar-safar/
├── index.html              # Main HTML file
├── css/
│   ├── style.css          # Main stylesheet
│   └── responsive.css     # Mobile responsive styles
├── js/
│   ├── app.js            # Main application logic
│   ├── gallery.js        # Image gallery functionality
│   └── map.js            # Map initialization and markers
└── data/
    └── locations.json    # Destination data
```

## Key Learning Outcomes

This project helped me learn:
- **API Integration**: Working with Leaflet.js mapping library
- **Async JavaScript**: Fetching and handling JSON data
- **DOM Manipulation**: Dynamic content creation and event handling
- **CSS Grid/Flexbox**: Responsive layout techniques
- **Modal Systems**: Creating accessible popup interfaces
- **Error Handling**: Basic try/catch implementation

## Setup and Installation

1. Clone the repository
2. Ensure you have a local server running (due to CORS restrictions with JSON files)
3. Open `index.html` in your browser
4. The application will automatically load destination data and initialize the map

## Notable Features

- **Custom Gallery System**: Built from scratch without external libraries
- **Map Integration**: Synchronized markers with gallery cards
- **Responsive Design**: Works across desktop and mobile devices
- **Pakistan Focus**: Curated content showcasing lesser-known Pakistani destinations

## Future Improvements

- Add user reviews and ratings
- Implement search functionality
- Add more detailed travel information
- Include weather data integration
- Add booking system integration

## Personal Note

This project represents my early journey into web development, combining my love for Pakistan's natural beauty with programming skills. While the code reflects my learning phase, it demonstrates practical application of core web technologies and problem-solving approaches.

---

*Built with ❤️ for Pakistan's tourism industry*