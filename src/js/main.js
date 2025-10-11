import "../css/style.css";
import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import MealList from "./MealList.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices();

const element = document.querySelector("#results-section");

const meal = new MealList("categories", dataSource, element, "categories.php");

meal.init();

document.querySelector("#search-btn")?.addEventListener("click", () => {
  const inputValue = document.querySelector("#ingredient-input").value;
  if (!inputValue) return;

  window.location.href = `/recipes_listing/index.html?ingredient=${inputValue}`;
});
