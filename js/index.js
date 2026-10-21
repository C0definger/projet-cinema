import { searchMovies } from "./api.js";
import { createMovieCard } from "./ui.js";

// Mot-clé utilisé pour simuler les "films tendances"
const TRENDING_QUERY = "star wars";

const moviesList = document.getElementById("movies-list");

// Récupère les films et les affiche
async function displayTrendingMovies() {
  try {
    const data = await searchMovies(TRENDING_QUERY);

    if (data.Response === "False") {
      moviesList.innerHTML = `<p>Aucun film trouvé.</p>`;
      return;
    }

    moviesList.innerHTML = data.Search.map(createMovieCard).join("");
  } catch (error) {
    moviesList.innerHTML = `<p>Erreur lors du chargement des films.</p>`;
    console.error(error);
  }
}

displayTrendingMovies();