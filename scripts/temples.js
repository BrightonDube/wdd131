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
