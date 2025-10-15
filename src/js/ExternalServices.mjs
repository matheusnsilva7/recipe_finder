import { convertToJson } from "./utils.mjs";
const baseURL = import.meta.env.VITE_SERVER_URL;
const SecondURL = import.meta.env.VITE_SECOND_API_URL;

export default class ExternalServices {
  constructor() {}
  getData(category) {
    return fetch(
      `${
        category.includes("search") || category.includes("get")
          ? SecondURL
          : baseURL
      }${category}`
    )
      .then(convertToJson)
      .then((data) => data);
  }
}
