import { renderListWithTemplate } from "./utils.mjs";

function MealCartTemplate(meal) {

  return `
  <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="recipe-img">
      <div class="recipe-info">
        <h1 class="recipe-title">${meal.strMeal}</h1>
        <p><strong>Category:</strong> ${meal.strCategory}</p>
        <p><strong>Area:</strong> ${meal.strArea}</p>
        <a href="${
          meal.strYoutube
        }" target="_blank" class="btn">Watch on YouTube</a>
      </div>
    </section>

    <section class="recipe-body">
      <h2>Ingredients</h2>

      <ul class="ingredients-list">
        ${Array.from({ length: 20 }, (_, i) => {
          const ingredient = meal[`strIngredient${i + 1}`];
          const measure = meal[`strMeasure${i + 1}`];
          return ingredient && ingredient.trim() !== ""
            ? `<li>${measure} ${ingredient}</li>`
            : "";
        }).join("")}
      </ul>

      <h2>Instructions</h2>
      <p class="instructions">${meal.strInstructions}</p>
    `;
}

export default class MealPage {
  constructor(category, dataSource, listElement, apiUrl) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.apiUrl = apiUrl;
  }

  async init() {
    const meal = await this.dataSource.getData(this.apiUrl);
    this.renderList(meal[this.category]);
  }

  renderList(meal) {
    document.querySelector(".recipe-header").innerHTML = MealCartTemplate(meal[0]);
  }
}
