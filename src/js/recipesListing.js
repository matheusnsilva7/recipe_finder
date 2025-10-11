import "../css/style.css";
import MealList from "./MealList.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category");
const ingredient = getParam("ingredient");

const dataSource = new ExternalServices();

const element = document.querySelector("#results-section");

const meal = new MealList(
  "meals",
  dataSource,
  element,
  `filter.php?${category ? "c" : "i"}=${category || ingredient}`
);

meal.init();

document.querySelector("#search-btn")?.addEventListener("click", () => {
  const inputValue = document.querySelector("#ingredient-input").value;
  if (!inputValue) return;

  window.location.href = `/recipes_listing/index.html?ingredient=${inputValue}`;
});
