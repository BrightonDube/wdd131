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
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://assets.ldscdn.org/93/40/9340e1957a3a78d3136bea620b4305fc89a548e5/manti_temple.jpeg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://assets.ldscdn.org/e5/54/e5546a3599c023ba83a4d751fb3e3c33f6d3afdc/payson_utah_temple.jpeg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://assets.ldscdn.org/b9/26/b9267e45ec13cfc5620554d27355521bd8b62ce5/yigo_guam_temple.jpeg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://assets.ldscdn.org/07/50/0750be93730a385e7331dfa2304677dd2c295cbf/washington_dc_temple_lds.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://assets.ldscdn.org/38/f4/38f4f0d67f1e10c2b606311d42aac4a8a30a014f/lima_peru_temple_lds.jpeg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://assets.ldscdn.org/c9/6c/c96c0929beb4fbbd9e604732e5468fb2b6c36a1a/mexico_city_temple_lds.jpeg"
  },
  {
    templeName: "Bern Switzerland",
    location: "Bern, Switzerland",
    dedicated: "1955, September, 11",
    area: 34500,
    imageUrl:
    "https://assets.ldscdn.org/54/56/5456e32e3e1d9a276052540538c67988493fd8eb/bern_switzerland_temple.jpeg"
  },
  {
    templeName: "Tokyo Japan",
    location: "Tokyo, Japan",
    dedicated: "1980, October, 27",
    area: 52590,
    imageUrl:
    "https://assets.ldscdn.org/75/e7/75e73b18a70568b8c691c889cc572c4b4fcf5aba/tokyo_japan_temple.jpeg"
  },
  {
    templeName: "Johannesburg South Africa",
    location: "Johannesburg, South Africa",
    dedicated: "1985, August, 24",
    area: 19184,
    imageUrl:
    "https://assets.ldscdn.org/06/8c/068c1fde3de2182496aeede8d790c267ad87d071/johannesburg_south_africa_temple.jpeg"
  },
  {
    templeName: "Nauvoo Illinois",
    location: "Nauvoo, Illinois, United States",
    dedicated: "2002, June, 27",
    area: 54000,
    imageUrl:
    "https://assets.ldscdn.org/c7/e6/c7e6d8075475517dc6dba2df79b0b98f15a3c978/nauvoo_illinois_temple.jpeg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41000,
    imageUrl:
    "https://assets.ldscdn.org/b2/89/b2891eb1787414ec6f5f136d642429a14425fdc5/rome_temple.jpeg"
  },
  {
    templeName: "Kyiv Ukraine",
    location: "Kyiv, Ukraine",
    dedicated: "2010, August, 29",
    area: 22184,
    imageUrl:
    "https://assets.ldscdn.org/66/94/6694513725193a5a6faf9589f706085e98a94345/kyiv_ukraine_temple.jpeg"
  },
  {
    templeName: "San Diego California",
    location: "San Diego, California, United States",
    dedicated: "1993, April, 25",
    area: 72000,
    imageUrl:
    "https://assets.ldscdn.org/08/b5/08b5e1e319bcc45e0ad261a09c451b463e12c960/san_diego_california_temple_lds.jpeg"
  },
  {
    templeName: "Sydney Australia",
    location: "Sydney, Australia",
    dedicated: "1984, September, 20",
    area: 26000,
    imageUrl:
    "https://assets.ldscdn.org/0f/36/0f36f588baa057b53f3f8cfcf7a48045a916aae1/sydney_australia_temple.jpeg"
  },
  {
    templeName: "Accra Ghana",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17500,
    imageUrl:
    "https://assets.ldscdn.org/83/16/8316c8eb1a74cc42a418684c11786fbb9102f03d/accra_ghana_temple_lds.jpeg"
  },
  {
    templeName: "Paris France",
    location: "Le Chesnay, France",
    dedicated: "2017, May, 21",
    area: 44175,
    imageUrl:
    "https://assets.ldscdn.org/f5/97/f597e8001b4d153e9d63ebffdf3a908c02271f37/paris_france_temple.jpeg"
  },
  {
    templeName: "Cebu City Philippines",
    location: "Cebu City, Philippines",
    dedicated: "2010, June, 13",
    area: 29556,
    imageUrl:
    "https://assets.ldscdn.org/87/5e/875e2cbc637ae93e78b1d27282a9752837c806e8/cebu_city_philippines_temple.jpeg"
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

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Display all temples initially
  displayTemples();
  
  // Set up filter event listeners
  setupFilterListeners();
  
  // Highlight 'Home' link by default
  highlightActiveFilter(document.getElementById('all-filter'));
});
