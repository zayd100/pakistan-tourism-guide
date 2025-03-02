
class DestinationGallery {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      this.filters = document.querySelectorAll('.gallery-filter');
      this.destinations = [];
      this.activeFilter = 'all';
      

      this.filters.forEach(filter => {
        filter.addEventListener('click', this.handleFilterClick.bind(this));
      });
    }
    
    async loadDestinations() {
      try {
        const response = await fetch('./data/locations.json');
        this.destinations = await response.json();
        this.renderGallery();
      } catch (error) {
        console.error('Error loading destinations:', error);
        this.container.innerHTML = '<p class="error">Failed to load destination data.</p>';
      }
    }
    
    handleFilterClick(event) {

      this.filters.forEach(f => f.classList.remove('active'));
      event.target.classList.add('active');
      
    
      this.activeFilter = event.target.getAttribute('data-filter');
   
      this.renderGallery();
    }
    
    renderGallery() {
  
      this.container.innerHTML = '';
      

      const filteredDestinations = this.activeFilter === 'all' 
        ? this.destinations 
        : this.destinations.filter(dest => dest.category === this.activeFilter);

      filteredDestinations.forEach(destination => {
        const card = document.createElement('div');
        card.className = 'gallery-card';
        card.setAttribute('data-id', destination.id);
        
        card.innerHTML = `
          <div class="gallery-image-container">
            <img src="${destination.images[0]}" alt="${destination.name}" class="gallery-image">
          </div>
          <div class="gallery-content">
            <h3>${destination.name}</h3>
            <div class="gallery-location">
              <i class="fas fa-map-marker-alt"></i>
              <span>${destination.region}</span>
            </div>
            <p>${destination.shortDescription}</p>
            <button class="view-gallery-btn" data-id="${destination.id}">View Gallery</button>
            
          </div>
        `;
        
        this.container.appendChild(card);
   
        card.querySelector('.view-gallery-btn').addEventListener('click', () => {
          this.openLightbox(destination);
        });
      });
      

      if (filteredDestinations.length === 0) {
        this.container.innerHTML = '<p class="no-results">No destinations found for this category.</p>';
      }
    }
    
    openLightbox(destination) {

      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      

      lightbox.innerHTML = `
        <div class="lightbox-content">
          <button class="lightbox-close">&times;</button>
          <h2>${destination.name}</h2>
          <div class="lightbox-slideshow">
            ${destination.images.map(img => 
              `<div class="lightbox-slide">
                <img src="${img}" alt="${destination.name}">
              </div>`
            ).join('')}
          </div>
          <div class="lightbox-controls">
            <button class="prev-slide">&lt;</button>
            <button class="next-slide">&gt;</button>
          </div>
          <div class="lightbox-info">
            <p>${destination.description}</p>
            <div class="lightbox-travel-tips">
              <h3>Travel Tips</h3>
              <ul>
                ${destination.travelTips.map(tip => `<li>${tip}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      `;
      

      document.body.appendChild(lightbox);
      document.body.classList.add('no-scroll');
      
      this.initLightbox(lightbox);
    }
    
    initLightbox(lightbox) {
      let currentSlide = 0;
      const slides = lightbox.querySelectorAll('.lightbox-slide');
      

      slides[0].classList.add('active');
      

      lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
        document.body.removeChild(lightbox);
        document.body.classList.remove('no-scroll');
      });
      
      lightbox.querySelector('.next-slide').addEventListener('click', () => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
      });
      
      lightbox.querySelector('.prev-slide').addEventListener('click', () => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
      });
    }
    
    init() {
      this.loadDestinations();
    }
  }
  
  // Initialize gallery
  document.addEventListener('DOMContentLoaded', () => {
    const gallery = new DestinationGallery('destination-gallery');
    gallery.init();
  });
