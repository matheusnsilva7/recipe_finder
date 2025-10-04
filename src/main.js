import "./style.css";
import { loadHeaderFooter } from "./assets/js/utils.mjs";
import ExternalServices from "./assets/js/ExternalServices.mjs";
import MealList from "./assets/js/MealList.mjs";

loadHeaderFooter();

const dataSource = new ExternalServices();

const element = document.querySelector("#results-section");

const meal = new MealList("categories.php", dataSource, element);

meal.init()