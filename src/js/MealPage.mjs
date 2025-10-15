import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function MealCartTemplate(meal, favorite) {
  return `
  <section class="recipe-information">
  <img src="${meal.strMealThumb || meal.image_url}" alt="${
    meal.strMeal || meal.title
  }" class="recipe-img">
      <div class="recipe-info">
        <h1 class="recipe-title">${meal.strMeal || meal.title}</h1>
        <p><strong>Category:</strong> ${meal.strCategory || "Not available"}</p>
        <p><strong>Area:</strong> ${meal.strArea || "Not available"}</p>
        <a href="${
          meal.strYoutube || meal.source_url
        }" target="_blank" class="btn">${
    !meal.source_url ? "Watch on YouTube" : "Recipe Source"
  }</a>
       ${
         favorite !== false
           ? `<button class="btn favorite" id="favorite" >${
               favorite || favorite?.length
                 ? "Remove from favotires"
                 : "favotires"
             }</button>`
           : ""
       }

      </div>
  </section>

    <section class="recipe-body">
      <h2>Ingredients</h2>

      <ul class="ingredients-list">
        ${
          meal.ingredients
            ? meal.ingredients.map((e) => `<li> ${e}</li>`).join("")
            : Array.from({ length: 20 }, (_, i) => {
                const ingredient = meal[`strIngredient${i + 1}`];
                const measure = meal[`strMeasure${i + 1}`];
                return ingredient && ingredient.trim() !== ""
                  ? `<li>${measure} ${ingredient}</li>`
                  : "";
              }).join("")
        }
      </ul>
        </section>
        ${
          meal.strInstructions
            ? `
      <section class="recipe-Instructions">
      <h2>Instructions</h2>
      <p class="instructions">${meal.strInstructions}</p>
      </section>`
            : ""
        }
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
    let favorite = getLocalStorage("favorite") || [];
    let history = getLocalStorage("history") || [];
    document.querySelector(".recipe-header").innerHTML = MealCartTemplate(
      meal[0] || meal,
      meal.recipe_id ? false : favorite.find((e) => e.id === meal["0"].idMeal)
    );

    document.querySelector("#favorite")?.addEventListener("click", (e) => {
      if (!favorite.find((e) => e.id === meal["0"].idMeal)) {
        favorite.push({
          name: meal[0].strMeal,
          image: meal[0].strMealThumb,
          id: meal[0].idMeal,
        });
        e.target.innerHTML = "Remove from favotires";
      } else {
        favorite = favorite?.filter((e) => e.id !== meal["0"].idMeal);
        e.target.innerHTML = "Favotires";
      }
      setLocalStorage("favorite", favorite);
    });

    if (!meal.recipe_id && !history.find((e) => e.id === meal["0"].idMeal)) {
      history.push({
        name: meal[0].strMeal,
        image: meal[0].strMealThumb,
        id: meal[0].idMeal,
      });

      if (history.length > 10) {
        history = history.slice(-10);
      }

      setLocalStorage("history", history);
    }
  }
}
