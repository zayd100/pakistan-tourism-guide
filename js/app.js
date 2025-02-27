// Reviews component for tourist destinations
class ReviewSystem {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      this.reviewForm = document.getElementById('review-form');
      this.locationSelect = document.getElementById('location-select');
      this.ratingStars = document.querySelectorAll('.rating-star');
      this.reviewsList = document.getElementById('reviews-list');
      this.sortSelect = document.getElementById('sort-reviews');
      
      this.reviews = [];
      this.locations = [];
      this.currentRating = 0;
      
      // Initialize event listeners
      this.initEventListeners();
    }
    
    async init() {
      await this.loadLocations();
      await this.loadReviews();
      this.populateLocationSelect();
      this.renderReviews();
    }
            function copyAddress() {
            var address = document.getElementById("ethAddress").textContent;
            navigator.clipboard.writeText(address);
            alert("ETH Address copied!");
        }
    async loadLocations() {
      try {
        const response = await fetch('./data/locations.json');
        this.locations = await response.json();
      } catch (error) {
        console.error('Error loading locations for reviews:', error);
      }
    }
    
    async loadReviews() {
      try {
        const response = await fetch('./data/reviews.json');
        this.reviews = await response.json();
      } catch (error) {
        console.error('Error loading reviews:', error);
        // If can't load reviews, initialize with empty array
        this.reviews = [];
      }
    }
    
    populateLocationSelect() {
      // Clear existing options
      this.locationSelect.innerHTML = '<option value="">Select a destination</option>';
      
      // Add options for each location
      this.locations.forEach(location => {
        const option = document.createElement('option');
        option.value = location.id;
        option.textContent = location.name;
        this.locationSelect.appendChild(option);
      });
    }
    
    initEventListeners() {
      // Rating stars
      this.ratingStars.forEach((star, index) => {
        star.addEventListener('click', () => {
          this.setRating(index + 1);
        });
        
        star.addEventListener('mouseover', () => {
          this.highlightStars(index + 1);
        });
        
        star.addEventListener('mouseout', () => {
          this.highlightStars(this.currentRating);
        });
      });
      
      // Review form submission
      this.reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submitReview();
      });
      
      // Sort select
      this.sortSelect.addEventListener('change', () => {
        this.renderReviews();
      });
    }
    
    setRating(rating) {
      this.currentRating = rating;
      this.highlightStars(rating);
    }
    
    highlightStars(count) {
      this.ratingStars.forEach((star, index) => {
        if (index < count) {
          star.classList.add('active');
        } else {
          star.classList.remove('active');
        }
      });
    }
    
    submitReview() {
      const locationId = this.locationSelect.value;
      const userName = document.getElementById('user-name').value;
      const reviewText = document.getElementById('review-text').value;
      
      if (!locationId || !userName || !reviewText || this.currentRating === 0) {
        alert('Please fill in all fields and provide a rating.');
        return;
      }
      
      // Get location name from ID
      const location = this.locations.find(loc => loc.id === locationId);
      
      // Create new review
      const newReview = {
        id: Date.now().toString(),
        locationId,
        locationName: location.name,
        userName,
        rating: this.currentRating,
        comment: reviewText,
        date: new Date().toISOString().split('T')[0]
      };
      
      // Add to reviews array
      this.reviews.push(newReview);
      
      // Save to local storage (in a real app, would send to server)
      localStorage.setItem('pakistanTourismReviews', JSON.stringify(this.reviews));
      
      // Reset form
      this.reviewForm.reset();
      this.setRating(0);
      
      // Re-render reviews
      this.renderReviews();
      
      // Show success message
      alert('Thank you for your review!');
    }
    
    renderReviews() {
      // Clear existing reviews
      this.reviewsList.innerHTML = '';
      
      // Sort reviews based on selected option
      const sortBy = this.sortSelect.value;
      let sortedReviews = [...this.reviews];
      
      switch (sortBy) {
        case 'date-newest':
          sortedReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case 'date-oldest':
          sortedReviews.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        case 'rating-highest':
          sortedReviews.sort((a, b) => b.rating - a.rating);
          break;
        case 'rating-lowest':
          sortedReviews.sort((a, b) => a.rating - b.rating);
          break;
      }
      
      // Create review cards
      sortedReviews.forEach(review => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        
        reviewCard.innerHTML = `
          <div class="review-header">
            <h4>${review.userName}</h4>
            <div class="review-location">${review.locationName}</div>
            <div class="review-date">${review.date}</div>
          </div>
          <div class="review-rating">
            ${this.generateStars(review.rating)}
          </div>
          <div class="review-content">
            <p>${review.comment}</p>
          </div>
        `;
        
        this.reviewsList.appendChild(reviewCard);
      });
      
      // Show message if no reviews
      if (sortedReviews.length === 0) {
        this.reviewsList.innerHTML = '<p class="no-reviews">No reviews yet. Be the first to leave a review!</p>';
      }
    }
    
    generateStars(rating) {
      let starsHTML = '';
      for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
          starsHTML += '<i class="fas fa-star"></i>';
        } else {
          starsHTML += '<i class="far fa-star"></i>';
        }
      }
      return starsHTML;
    }
  }
  
  // Initialize review system when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    const reviewSystem = new ReviewSystem('reviews-container');
    reviewSystem.init();
  });
