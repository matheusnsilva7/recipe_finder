import { renderListWithTemplate } from "./utils.mjs";

function MealCartTemplate(category) {
  return `
  <li class="recipe-card">
  <a href="/category_pages/index.html?id=${category.idCategory}">
        <img src="${category.strCategoryThumb}" alt="${category.strCategory}">
        <h2 class="card__name">${category.strCategory}</h2>
        <p class="card__description">
          ${
            category.strCategoryDescription.length > 100
              ? category.strCategoryDescription.substring(0, 100) + "..."
              : category.strCategoryDescription
          }
        </p>
      </a>
    </li>
    `;
}

export default class MealList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(MealCartTemplate, this.listElement, list);
  }
}
