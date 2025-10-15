import "../css/style.css";
import MealList from "./MealList.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const ingredient = getParam("ingredient");
const recipes = getParam("recipes");

const dataSource = new ExternalServices();

const element = document.querySelector("#results-section");

document.querySelector(".searched-recipe").textContent = category || ingredient;

const meal = new MealList(
  recipes ? "recipes" : "meals",
  dataSource,
  element,
  recipes
    ? `search?q=${recipes}`
    : `filter.php?${category ? "c" : "i"}=${category || ingredient}`
);

meal.init();

document.querySelector("#search-btn")?.addEventListener("click", () => {
  const inputValue = document.querySelector("#ingredient-input").value;
  if (!inputValue) return;

  window.location.href = `/recipes_listing/index.html?ingredient=${inputValue}`;
});

document.querySelector(".no-recipes span").addEventListener("click", () => {
  window.location.href = `/recipes_listing/index.html?recipes=${
    category || ingredient
  }`;
});
