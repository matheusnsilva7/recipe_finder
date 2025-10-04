import { convertToJson } from "./utils.mjs";
const baseURL = import.meta.env.VITE_SERVER_URL;

export default class ExternalServices {
  constructor() {}
  getData(category) {
    return fetch(`${baseURL}${category}`)
      .then(convertToJson)
      .then((data) => {
        return data.categories;
      });
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}${id}`);
    const data = await convertToJson(response);
    return data;
  }
}
