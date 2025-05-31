const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');

hamburger.addEventListener('click', function () {
  nav.classList.toggle('active');
  this.classList.toggle('active');
  this.textContent = this.classList.contains('active') ? '✕' : '☰';
  this.setAttribute('aria-expanded', nav.classList.contains('active'));
});

// Update year
document.getElementById('year').textContent = new Date().getFullYear();

// Handle last modified date
const lastModified =
  localStorage.getItem('lastModified') || document.lastModified;
const formattedDate = new Date(lastModified).toLocaleString('en-US', {
  month: '2-digit',
  day: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

document.getElementById('lastModified').textContent = formattedDate;
localStorage.setItem('lastModified', new Date().toISOString());

// Temple data array - information about each temple
const temples = [
  // Local temple images
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl: "images/salt-lake-temple.webp"
  },
  {
    templeName: "Los Angeles",
    location: "Los Angeles, California, United States",
    dedicated: "1956, March, 11",
    area: 190614,
    imageUrl: "images/los-angeles-temple.webp"
  },
  {
    templeName: "Ogden Utah",
    location: "Ogden, Utah, United States",
    dedicated: "2014, September, 21",
    area: 112232,
    imageUrl: "images/ogden-utah-temple.webp"
  },
  {
    templeName: "Seattle",
    location: "Bellevue, Washington, United States",
    dedicated: "1980, November, 17",
    area: 110000,
    imageUrl: "images/seattle-temple.webp"
  },
  {
    templeName: "Draper Utah",
    location: "Draper, Utah, United States",
    dedicated: "2009, March, 20",
    area: 58300,
    imageUrl: "images/draper-temple.webp"
  },
  {
    templeName: "Albuquerque New Mexico",
    location: "Albuquerque, New Mexico, United States",
    dedicated: "2000, March, 5",
    area: 34245,
    imageUrl: "images/albuquerque-temple.webp"
  },
  {
    templeName: "Dallas Texas",
    location: "Dallas, Texas, United States",
    dedicated: "1984, October, 19",
    area: 44207,
    imageUrl: "images/dallas-temple.webp"
  },
  {
    templeName: "Fort Collins Colorado",
    location: "Fort Collins, Colorado, United States",
    dedicated: "2016, October, 16",
    area: 42000,
    imageUrl: "images/fort-collins-temple.webp"
  },
  {
    templeName: "Indianapolis Indiana",
    location: "Carmel, Indiana, United States",
    dedicated: "2015, August, 23",
    area: 34000,
    imageUrl: "images/indianapolis-temple.webp"
  },
  
  // Online temple images for those without local images
  {
    templeName: 'Aba Nigeria',
    location: 'Aba, Nigeria',
    dedicated: '2005, August, 7',
    area: 11500,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Aba_Nigeria_Temple.jpg'
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, USA",
    dedicated: "1888, May, 21",
    area: 100373,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Manti_Temple_%28Manti%2C_Utah%2C_USA%29.jpg/800px-Manti_Temple_%28Manti%2C_Utah%2C_USA%29.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Payson_Utah_Temple.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Yigo_Guam_Temple.jpg/800px-Yigo_Guam_Temple.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 160000,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Washington_D.C._Temple_original.jpg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Peru",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Lima_Peru_Temple.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Mexico_City_Temple_Exterior.jpg"
  },
  {
    templeName: "Bern Switzerland",
    location: "Bern, Switzerland",
    dedicated: "1955, September, 11",
    area: 18500,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/eb/Switzerland_Temple.jpg"
  },
  {
    templeName: "Tokyo Japan",
    location: "Tokyo, Japan",
    dedicated: "1980, October, 27",
    area: 52590,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Tokyo-temple-lds.jpg"
  },
  {
    templeName: "Johannesburg South Africa",
    location: "Johannesburg, South Africa",
    dedicated: "1985, August, 24",
    area: 14500,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Johannesburg_Temple.jpg"
  },
  {
    templeName: "Nauvoo Illinois",
    location: "Nauvoo, Illinois, United States",
    dedicated: "2002, June, 27",
    area: 54000,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Nauvoo_Temple.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41000,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Temple_Rome_Italy.jpg"
  },
  {
    templeName: "Kyiv Ukraine",
    location: "Kyiv, Ukraine",
    dedicated: "2010, August, 29",
    area: 22000,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/9/95/Kiev_Ukraine_Temple.jpg"
  },
  {
    templeName: "San Diego California",
    location: "San Diego, California, United States",
    dedicated: "1993, April, 25",
    area: 72000,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/87/San_Diego_California_Temple8.jpg"
  },
  {
    templeName: "Sydney Australia",
    location: "Sydney, Australia",
    dedicated: "1984, September, 20",
    area: 30658,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Sydney_Australia_Temple_1.jpg"
  },
  {
    templeName: "Accra Ghana",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17500,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/61/Accra_Ghana_Temple.jpg"
  },
  {
    templeName: "Paris France",
    location: "Le Chesnay, France",
    dedicated: "2017, May, 21",
    area: 44175,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Temple_Paris_France.jpg"
  },
  {
    templeName: "Cebu City Philippines",
    location: "Cebu City, Philippines",
    dedicated: "2010, June, 13",
    area: 29556,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/d/df/Cebu_City_Philippines_Temple.jpg"
  }
];

// Function to parse dedication year from temple's dedicated string
function getDedicationYear(dedicatedStr) {
  // Format is like: '1888, May, 21' - we need to extract the year (first part)
  return parseInt(dedicatedStr.split(',')[0]);
}

// Filter functions
function filterOldTemples(temple) {
  return getDedicationYear(temple.dedicated) < 1900;
}

function filterNewTemples(temple) {
  return getDedicationYear(temple.dedicated) > 2000;
}

function filterLargeTemples(temple) {
  return temple.area > 90000;
}

function filterSmallTemples(temple) {
  return temple.area < 10000;
}

// Function to create and display temple cards with optional filter
function displayTemples(filter = null) {
  const templeCardsContainer = document.getElementById('templeCards');
  
  // Clear any existing content
  templeCardsContainer.innerHTML = '';
  
  // Apply filter if provided, otherwise use all temples
  const filteredTemples = filter ? temples.filter(filter) : temples;
  
  // Update heading to show the number of temples displayed
  const heading = document.querySelector('h2');
  if (heading) {
    heading.textContent = `Featured Temples (${filteredTemples.length})`;
  }
  
  // Loop through filtered temple data and create elements
  filteredTemples.forEach(temple => {
    // Create figure element
    const figure = document.createElement('figure');
    
    // Create image element
    const img = document.createElement('img');
    img.src = temple.imageUrl;
    img.alt = temple.templeName;
    img.loading = 'lazy'; // Add native lazy loading
    
    // Add error handling for images that fail to load
    img.onerror = function() {
      // If the image URL is external (not local) and fails to load
      if (!temple.imageUrl.startsWith('images/')) {
        // Set a default placeholder image from your local images folder
        this.src = 'images/temple-placeholder.webp';
        // If no placeholder exists, create a colored div with temple name
        this.onerror = function() {
          const placeholder = document.createElement('div');
          placeholder.className = 'image-placeholder';
          placeholder.textContent = temple.templeName;
          this.parentNode.replaceChild(placeholder, this);
        };
      }
    };
    
    // Create figcaption for temple name
    const nameCaption = document.createElement('h3');
    nameCaption.textContent = temple.templeName;
    
    // Create div for temple details
    const details = document.createElement('div');
    details.className = 'temple-details';
    
    // Add location
    const location = document.createElement('p');
    const locationLabel = document.createElement('span');
    locationLabel.textContent = 'Location: ';
    locationLabel.className = 'label';
    const locationValue = document.createElement('span');
    locationValue.textContent = temple.location;
    locationValue.className = 'value';
    location.appendChild(locationLabel);
    location.appendChild(locationValue);
    
    // Add dedication date
    const dedicated = document.createElement('p');
    const dedicatedLabel = document.createElement('span');
    dedicatedLabel.textContent = 'Dedicated: ';
    dedicatedLabel.className = 'label';
    const dedicatedValue = document.createElement('span');
    dedicatedValue.textContent = temple.dedicated;
    dedicatedValue.className = 'value';
    dedicated.appendChild(dedicatedLabel);
    dedicated.appendChild(dedicatedValue);
    
    // Add area
    const area = document.createElement('p');
    const areaLabel = document.createElement('span');
    areaLabel.textContent = 'Size: ';
    areaLabel.className = 'label';
    const areaValue = document.createElement('span');
    areaValue.textContent = temple.area.toLocaleString() + ' sq ft';
    areaValue.className = 'value';
    area.appendChild(areaLabel);
    area.appendChild(areaValue);
    
    // Append all details
    details.appendChild(location);
    details.appendChild(dedicated);
    details.appendChild(area);
    
    // Append elements to figure
    figure.appendChild(img);
    figure.appendChild(nameCaption);
    figure.appendChild(details);
    
    // Append figure to container
    templeCardsContainer.appendChild(figure);
  });
}

// Set up event listeners for filter links
function setupFilterListeners() {
  // All temples (Home)
  document.getElementById('all-filter').addEventListener('click', function(e) {
    e.preventDefault();
    displayTemples(); // No filter = all temples
    highlightActiveFilter(this);
  });
  
  // Old temples (before 1900)
  document.getElementById('old-filter').addEventListener('click', function(e) {
    e.preventDefault();
    displayTemples(filterOldTemples);
    highlightActiveFilter(this);
  });
  
  // New temples (after 2000)
  document.getElementById('new-filter').addEventListener('click', function(e) {
    e.preventDefault();
    displayTemples(filterNewTemples);
    highlightActiveFilter(this);
  });
  
  // Large temples (> 90,000 sq ft)
  document.getElementById('large-filter').addEventListener('click', function(e) {
    e.preventDefault();
    displayTemples(filterLargeTemples);
    highlightActiveFilter(this);
  });
  
  // Small temples (< 10,000 sq ft)
  document.getElementById('small-filter').addEventListener('click', function(e) {
    e.preventDefault();
    displayTemples(filterSmallTemples);
    highlightActiveFilter(this);
  });
}

// Function to highlight the active filter link
function highlightActiveFilter(activeLink) {
  // Remove active class from all links
  const links = document.querySelectorAll('.nav a');
  links.forEach(link => link.classList.remove('active'));
  
  // Add active class to clicked link
  activeLink.classList.add('active');
}

// Function to update the footer copyright year and last modified date
function updateFooter() {
  // Get the current year for copyright
  const currentYear = new Date().getFullYear();
  document.getElementById('year').textContent = currentYear;
  
  // Get the last modified date of the document
  const lastModified = new Date(document.lastModified);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('lastModified').textContent = lastModified.toLocaleDateString('en-US', options);
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Display all temples initially
  displayTemples();
  
  // Set up filter event listeners
  setupFilterListeners();
  
  // Highlight 'Home' link by default
  highlightActiveFilter(document.getElementById('all-filter'));
  
  // Update footer information
  updateFooter();
});
