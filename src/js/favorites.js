import "../css/style.css";
import FavoriteList from "./FavoriteList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

const favoriteElement = document.querySelector(".favorite-recipes");
const historyElement = document.querySelector(".history-recipes");

const favorite = new FavoriteList("favorite", favoriteElement);

favorite.init();

const history = new FavoriteList("history", historyElement);

history.init();
