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
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Bern Switzerland",
    location: "Bern, Switzerland",
    dedicated: "1955, September, 11",
    area: 34500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/bern-switzerland/400x250/bern-switzerland-temple-772755-wallpaper.jpg"
  },
  {
    templeName: "Tokyo Japan",
    location: "Tokyo, Japan",
    dedicated: "1980, October, 27",
    area: 52590,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/tokyo-japan/400x250/tokyo-japan-temple-exterior-1.jpeg"
  },
  {
    templeName: "Johannesburg South Africa",
    location: "Johannesburg, South Africa",
    dedicated: "1985, August, 24",
    area: 19184,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/johannesburg-south-africa/400x250/johannesburg-temple-lds-1159789-wallpaper.jpg"
  },
  {
    templeName: "Nauvoo Illinois",
    location: "Nauvoo, Illinois, United States",
    dedicated: "2002, June, 27",
    area: 54000,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/nauvoo-illinois/400x250/nauvoo-illinois-temple-769337-wallpaper.jpg"
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41000,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/400x250/rome-italy-temple-exterior-1500244.jpg"
  },
  {
    templeName: "Kyiv Ukraine",
    location: "Kyiv, Ukraine",
    dedicated: "2010, August, 29",
    area: 22184,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/kyiv-ukraine/400x250/kyiv-ukraine-temple-exterior-1392536.jpg"
  },
  {
    templeName: "San Diego California",
    location: "San Diego, California, United States",
    dedicated: "1993, April, 25",
    area: 72000,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/san-diego-california/400x250/san-diego-temple-aerial-1075791-wallpaper.jpg"
  },
  {
    templeName: "Sydney Australia",
    location: "Sydney, Australia",
    dedicated: "1984, September, 20",
    area: 26000,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/sydney-australia/400x250/sydney-australia-temple-exterior-1240693.jpg"
  },
  {
    templeName: "Accra Ghana",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/accra-ghana/400x250/accra-ghana-temple-lds-349054-wallpaper.jpg"
  },
  {
    templeName: "Paris France",
    location: "Le Chesnay, France",
    dedicated: "2017, May, 21",
    area: 44175,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/paris-france/400x250/paris-france-temple-exterior-1393776-wallpaper.jpg"
  },
  {
    templeName: "Cebu City Philippines",
    location: "Cebu City, Philippines",
    dedicated: "2010, June, 13",
    area: 29556,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/cebu-city-philippines/400x250/cebu-city-philippines-temple-exterior-1393302-wallpaper.jpg"
  }
];

// Function to create and display temple cards
function displayTemples() {
  const templeCardsContainer = document.getElementById('templeCards');
  
  // Clear any existing content
  templeCardsContainer.innerHTML = '';
  
  // Loop through temple data and create elements
  temples.forEach(temple => {
    // Create figure element
    const figure = document.createElement('figure');
    
    // Create image element
    const img = document.createElement('img');
    img.src = temple.imageUrl;
    img.alt = temple.templeName;
    img.loading = 'lazy'; // Add native lazy loading
    
    // Create figcaption for temple name
    const nameCaption = document.createElement('h3');
    nameCaption.textContent = temple.templeName;
    
    // Create div for temple details
    const details = document.createElement('div');
    details.className = 'temple-details';
    
    // Add location
    const location = document.createElement('p');
    location.innerHTML = '<strong>Location:</strong> ' + temple.location;
    
    // Add dedication date
    const dedicated = document.createElement('p');
    dedicated.innerHTML = '<strong>Dedicated:</strong> ' + temple.dedicated;
    
    // Add area
    const area = document.createElement('p');
    area.innerHTML = '<strong>Area:</strong> ' + temple.area.toLocaleString() + ' square feet';
    
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

// Call the function to display temples when the page loads
document.addEventListener('DOMContentLoaded', displayTemples);
