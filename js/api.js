const API_KEY = "e0920923";
const BASE_URL = "https://www.omdbapi.com/";

// Cherche des films par titre (10 résultats par page).
// year et type sont facultatifs : on les ajoute à l'adresse seulement s'ils sont fournis.
export async function searchMovies(title, page = 1, year = "", type = "") {
  let url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(title)}&page=${page}`;

  if (year) {
    url += `&y=${year}`;
  }
  if (type) {
    url += `&type=${type}`;
  }

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Récupère les détails d'un film à partir de son identifiant imdbID.
// plot vaut "full" (résumé complet) ou "short" (résumé court).
export async function getMovieById(id, plot = "full") {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&i=${encodeURIComponent(id)}&plot=${plot}`
  );
  const data = await response.json();
  return data;
}