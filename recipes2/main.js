import recipes from "./recipes.mjs";

function getRandom(range) {
	return Math.floor(Math.random() * range);
}

function getRandomElement(array) {
	const index = getRandom(array.length);
	return array[index];
}

function tagsTemplate(tags) {
	let result = `<div class="tags">`;

	for (const tag of tags) {
		result += `<span class="tag">${tag}</span>\n`;
	}

	result += `</div>`;
	return result;
}

function ratingTemplate(rating) {
	let result = `<span
					class="rating"
					role="img"
					aria-label="Rating: ${rating} out of 5 stars"
				>`;

	for (let i = 0; i < 5; i++) {
		result += `<span aria-hidden="true" class="icon-star">${i < rating ? "⭐" : "☆"}</span>`;
	}

	result += `</span>`
	return result;
}

function recipeTemplate(recipe) {
	return `<section class="recipe">
			<img src="${recipe.image}" alt="${recipe.name}">
			<div>
				${tagsTemplate(recipe.tags)}
				<h1 class="dish-name">${recipe.name}</h1>
				<p class="description">${recipe.description}</p>
				<br>
				${ratingTemplate(recipe.rating)}			
			</div>
		</section>`;
}

function renderRecipes(recipeList) {
	const recipesContainer = document.querySelector("#recipes-container");
	let recipes = ""

	for (const recipe of recipeList) {
		recipes += recipeTemplate(recipe);
	}

	recipesContainer.innerHTML = recipes;
}

function searchHandler() {
	const searchInput = document.querySelector("#search-input");
	const search = searchInput.value.toLowerCase().trim();

	const recipeList = recipes.filter((recipe) => {
		return recipe.name.toLowerCase().includes(search) ||
			recipe.description.toLowerCase().includes(search) ||
			recipe.tags.find((tag) => tag.toLowerCase().includes(search)) ||
			recipe.recipeIngredient.find((ingredient) => ingredient.toLowerCase().includes(search));
	});
	recipeList.sort((a, b) => a.name.localeCompare(b.name));
	renderRecipes(recipeList);
}

function init() {
	const recipe = getRandomElement(recipes);
	renderRecipes([recipe]);
}

init();

document.querySelector("#search-button").addEventListener("click", searchHandler);