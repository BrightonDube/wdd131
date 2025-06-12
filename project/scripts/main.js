// Fetch and display recipes from JSON

document.addEventListener('DOMContentLoaded', () => {
  // Contact form handler for about.html
  const contactForm = document.querySelector('.contact form');
  const responseDiv = document.getElementById('contact-response');
  if (contactForm && responseDiv) {
    function escapeHTML(str) {
      return str.replace(/[&<>'"]/g, function(tag) {
        const chars = {'&':'&amp;','<':'&lt;','>':'&gt;','\'':'&#39;','"':'&quot;'};
        return chars[tag] || tag;
      });
    }
    function validateEmail(email) {
      return /^\S+@\S+\.\S+$/.test(email);
    }
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = contactForm.elements['name'].value.trim();
      const email = contactForm.elements['email'].value.trim();
      const message = contactForm.elements['message'].value.trim();
      let error = '';
      if (!name) error += '<p>Please enter your name.</p>';
      if (!email || !validateEmail(email)) error += '<p>Please enter a valid email address.</p>';
      if (!message) error += '<p>Please enter a message.</p>';
      if (error) {
        responseDiv.innerHTML = `<div class="contact-error">${error}</div>`;
        responseDiv.scrollIntoView({behavior: 'smooth'});
        return;
      }
      // Sanitize
      const safeName = escapeHTML(name);
      const safeEmail = escapeHTML(email);
      const safeMessage = escapeHTML(message);
      responseDiv.innerHTML = `<div class="contact-success">
        <h3>Hello ${safeName},</h3>
        <p>Your message (<strong>${safeMessage}</strong>) has been forwarded and you will get an email at <strong>${safeEmail}</strong>.</p>
      </div>`;
      contactForm.reset();
      responseDiv.scrollIntoView({behavior: 'smooth'});
    });
  }
  // Responsive Nav Toggle
  const nav = document.querySelector('nav');
  const navToggle = nav ? nav.querySelector('.nav-toggle') : null;
  const navUl = nav ? nav.querySelector('ul') : null;
  if (nav && navToggle && navUl) {
    navToggle.addEventListener('click', function(e) {
      navUl.classList.toggle('open');
      navToggle.classList.toggle('open');
      const expanded = navUl.classList.contains('open');
      navToggle.setAttribute('aria-expanded', expanded);
      e.stopPropagation();
    });
    // Close nav when a link is clicked
    navUl.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        navUl.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
    // Close nav when clicking outside
    document.addEventListener('click', function(e) {
      if (navUl.classList.contains('open') && !navUl.contains(e.target) && !navToggle.contains(e.target)) {
        navUl.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
  // On planner.html
  if (document.querySelector('.planner-grid')) {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const meals = ["Breakfast", "Lunch", "Dinner"];
    const plannerGrid = document.querySelector('.planner-grid');
    const shoppingBtn = document.querySelector('.meal-planner button');
    let recipes = [];
    let planner = JSON.parse(localStorage.getItem('mealPlanner')) || {};

    function renderPlanner() {
      let html = '<table class="meal-table"><thead><tr><th>Day</th>';
      meals.forEach(meal => html += `<th>${meal}</th>`);
      html += '</tr></thead><tbody>';
      days.forEach(day => {
        html += `<tr><td>${day}</td>`;
        meals.forEach(meal => {
          const key = `${day}_${meal}`;
          const selected = planner[key] || '';
          html += `<td><select data-day="${day}" data-meal="${meal}">
            <option value="">-- Select --</option>
            ${recipes.map(r => `<option value="${r.id}"${selected==r.id?" selected":''}>${r.name}</option>`).join('')}
          </select></td>`;
        });
        html += '</tr>';
      });
      html += '</tbody></table>';
      plannerGrid.innerHTML = html + '<div id="shopping-list"></div>';
    }

    function updatePlanner(e) {
      if (e.target.tagName === 'SELECT') {
        const day = e.target.getAttribute('data-day');
        const meal = e.target.getAttribute('data-meal');
        const key = `${day}_${meal}`;
        planner[key] = e.target.value;
        localStorage.setItem('mealPlanner', JSON.stringify(planner));
      }
    }

    function generateShoppingList() {
      const selectedIds = Object.values(planner).filter(Boolean);
      const selectedRecipes = recipes.filter(r => selectedIds.includes(String(r.id)));
      let ingredients = {};
      selectedRecipes.forEach(r => {
        (r.ingredients||[]).forEach(ing => {
          ingredients[ing] = (ingredients[ing]||0) + 1;
        });
      });
      const listDiv = document.getElementById('shopping-list');
      if (selectedRecipes.length === 0) {
        listDiv.innerHTML = '<div class="contact-error">No recipes selected for the week.</div>';
        return;
      }
      listDiv.innerHTML = '<div class="shopping-list"><h3>Shopping List</h3><ul>' +
        Object.entries(ingredients).map(([ing, count]) => `<li>${ing}${count>1?` <span class='qty'>x${count}</span>`:''}</li>`).join('') +
        '</ul></div>';
      listDiv.scrollIntoView({behavior: 'smooth'});
    }

    fetch('data/recipes.json')
      .then(res => res.json())
      .then(data => {
        recipes = data;
        renderPlanner();
        plannerGrid.addEventListener('change', updatePlanner);
        if (shoppingBtn) shoppingBtn.onclick = generateShoppingList;
      });
  }

  // On recipes.html
  if (document.querySelector('.recipe-grid')) {
    const searchInput = document.querySelector('.recipe-search input[type="search"]');
    if (searchInput) {
      // Restore last search value
      const lastSearch = localStorage.getItem('recipeSearch');
      if (lastSearch) {
        searchInput.value = lastSearch;
      }
      // Save search value on input
      searchInput.addEventListener('input', () => {
        localStorage.setItem('recipeSearch', searchInput.value);
      });
    }
    fetch('data/recipes.json')
      .then(res => res.json())
      .then(data => displayRecipes(data));
  }

  // On index.html (show 3 featured)
  if (document.querySelector('.recipe-cards')) {
    fetch('data/recipes.json')
      .then(res => res.json())
      .then(data => displayFeaturedRecipes(data));
  }
});

function displayRecipes(recipes) {
  const grid = document.querySelector('.recipe-grid');
  grid.innerHTML = recipes.map(recipe => `
    <div class="recipe-card">
      <img src="${recipe.image}" alt="${recipe.name}">
      <h3>${recipe.name}</h3>
      <p class="category">${recipe.category}</p>
      <ul class="tags">${recipe.tags.map(tag => `<li>${tag}</li>`).join('')}</ul>
      <button onclick="showRecipe(${recipe.id})">View Recipe</button>
    </div>
  `).join('');
}

function displayFeaturedRecipes(recipes) {
  const cards = document.querySelector('.recipe-cards');
  const featured = recipes.slice(0, 3);
  cards.innerHTML = featured.map(recipe => `
    <div class="recipe-card">
      <img src="${recipe.image}" alt="${recipe.name}">
      <h3>${recipe.name}</h3>
      <p class="category">${recipe.category}</p>
    </div>
  `).join('');
}

// Placeholder for recipe modal/detail
function showRecipe(id) {
  alert('Recipe details for ID: ' + id + '\n(Detail view coming soon!)');
}
