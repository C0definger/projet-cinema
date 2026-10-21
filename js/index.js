import { searchMovies } from "./api.js";

const result = await searchMovies("transformers");
console.log(result);