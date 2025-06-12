// Fetch and display recipes from JSON

document.addEventListener('DOMContentLoaded', () => {
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
