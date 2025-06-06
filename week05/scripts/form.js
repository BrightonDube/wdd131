// Product data
const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Populate product dropdown
  const productSelect = document.getElementById('product');
  
  if (productSelect) {
    products.forEach(product => {
      const option = document.createElement('option');
      option.value = product.id;
      option.textContent = product.name;
      productSelect.appendChild(option);
    });
  }

  // Set default date to today
  const today = new Date().toISOString().split('T')[0];
  const dateInput = document.getElementById('installDate');
  if (dateInput) {
    dateInput.value = today;
    dateInput.max = today; // Prevent future dates
  }

  // Form submission handler
  const form = document.getElementById('reviewForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      // Form is valid, increment review counter
      incrementReviewCounter();
    });
  }
});

// Function to increment and store review counter
function incrementReviewCounter() {
  let reviewCount = localStorage.getItem('reviewCount');
  reviewCount = reviewCount ? parseInt(reviewCount) + 1 : 1;
  localStorage.setItem('reviewCount', reviewCount.toString());
}

// Function to get current review count (for review.html)
function getReviewCount() {
  return localStorage.getItem('reviewCount') || 0;
}
