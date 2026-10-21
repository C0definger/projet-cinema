const API_KEY = "e0920923";
const BASE_URL = "https://www.omdbapi.com/";

// Cherche des films par titre
export async function searchMovies(title) {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${title}`);
  const data = await response.json();
  return data;
}