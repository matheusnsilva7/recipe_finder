import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

function MealCartTemplate(category) {
  return `
  <li class="recipe-card">
  <a href="/recipes_page/index.html?recipe=${category.id}">
        <img src="${category.image}" alt="${category.name}">
        <h2 class="card__name">${category.name}</h2>
      </a>
    </li>
    `;
}

export default class FavoriteList {
  constructor(category, listElement) {
    this.listElement = listElement;
    this.category = category;
  }

  async init() {
    const list = getLocalStorage(this.category);
    this.renderList(list);
  }

  renderList(list) {
    if(list?.length) renderListWithTemplate(MealCartTemplate, this.listElement, list);
  }
}
