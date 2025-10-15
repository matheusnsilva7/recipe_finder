import "../css/style.css";
import MealPage from "./MealPage.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const recipe = getParam("recipe");
const forkifyRecipe = getParam("recipe2");

const dataSource = new ExternalServices();

const element = document.querySelector(".recipe-header");

const meal = new MealPage(
  forkifyRecipe ? "recipe" : "meals",
  dataSource,
  element,
  recipe
    ? `lookup.php?i=${recipe}`
    : forkifyRecipe
    ? `get?rId=${forkifyRecipe}`
    : "random.php"
);

meal.init();

document.querySelector("#search-btn")?.addEventListener("click", () => {
  const inputValue = document.querySelector("#ingredient-input").value;
  if (!inputValue) return;

  window.location.href = `/recipes_listing/index.html?ingredient=${inputValue}`;
});
