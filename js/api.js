const API_KEY = "e0920923";
const BASE_URL = "https://www.omdbapi.com/";

// Cherche des films par titre (10 résultats par page)
export async function searchMovies(title, page = 1) {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(title)}&page=${page}`
  );
  const data = await response.json();
  return data;
}