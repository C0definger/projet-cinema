import { getMovieById } from "./api.js";
import { NO_POSTER } from "./ui.js";

const movieDetails = document.getElementById("movie-details");

// Construit le HTML de la fiche d'un film
function createMovieDetails(movie) {
  const poster = movie.Poster !== "N/A" ? movie.Poster : NO_POSTER;

  return `
    <article class="movie-details-card">
      <img src="${poster}" alt="Affiche de ${movie.Title}">
      <div class="movie-info">
        <h2>${movie.Title} <span>(${movie.Year})</span></h2>
        <p><strong>Genre :</strong> ${movie.Genre}</p>
        <p><strong>Durée :</strong> ${movie.Runtime}</p>
        <p><strong>Réalisateur :</strong> ${movie.Director}</p>
        <p><strong>Acteurs :</strong> ${movie.Actors}</p>
        <p><strong>Note IMDb :</strong> ${movie.imdbRating} / 10</p>
        <p><strong>Résumé :</strong> ${movie.Plot}</p>
        <a href="index.html" class="back-link">← Retour à l'accueil</a>
      </div>
    </article>
  `;
}

// Récupère l'identifiant dans l'adresse, puis affiche le film
async function displayMovie() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    movieDetails.innerHTML = `<p>Aucun film sélectionné.</p>`;
    return;
  }

  try {
    const movie = await getMovieById(id);

    if (movie.Response === "False") {
      movieDetails.innerHTML = `<p>Film introuvable.</p>`;
      return;
    }

    document.title = `Cinéma - ${movie.Title}`;
    movieDetails.innerHTML = createMovieDetails(movie);
  } catch (error) {
    movieDetails.innerHTML = `<p>Erreur lors du chargement du film.</p>`;
    console.error(error);
  }
}

displayMovie();