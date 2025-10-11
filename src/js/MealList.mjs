import { renderListWithTemplate } from "./utils.mjs";

function MealCartTemplate(category) {
  return `
  <li class="recipe-card">
  <a href="/${
    category.idMeal
      ? "recipes_page/index.html?recipe"
      : "recipes_listing/index.html?category"
  }=${category.strCategory || category.idMeal}">
        <img src="${category.strCategoryThumb || category.strMealThumb}" alt="${
    category.strCategory || category.strMeal
  }">
        <h2 class="card__name">${category.strCategory || category.strMeal}</h2>
        ${
          category.strCategoryDescription
            ? `<p class="card__description">
          ${
            category.strCategoryDescription.length > 100
              ? category.strCategoryDescription.substring(0, 100) + "..."
              : category.strCategoryDescription
          }
        </p>`
            : ""
        }
      </a>
    </li>
    `;
}

export default class MealList {
  constructor(category, dataSource, listElement, apiUrl) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.apiUrl = apiUrl;
  }

  async init() {
    const list = await this.dataSource.getData(this.apiUrl);
    this.renderList(list[this.category]);
  }

  renderList(list) {
    renderListWithTemplate(MealCartTemplate, this.listElement, list);
  }
}
