import { searchMovies } from "./api.js";

// Mot-clé utilisé pour simuler les "films tendances"
const TRENDING_QUERY = "star wars";

const moviesList = document.getElementById("movies-list");

// Image de remplacement quand un film n'a pas d'affiche
const NO_POSTER = "https://placehold.co/300x445?text=Pas+d%27affiche";

// Construit le HTML d'une carte de film
function createMovieCard(movie) {
  const poster = movie.Poster !== "N/A" ? movie.Poster : NO_POSTER;

  return `
    <article class="movie-card">
      <a href="movie.html?id=${movie.imdbID}">
        <img src="${poster}" alt="Affiche de ${movie.Title}">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
      </a>
    </article>
  `;
}

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