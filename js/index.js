import { searchMovies, getMovieById } from "./api.js";
import { createMovieCard } from "./ui.js";

// Films tendance (identifiants ImdbID)
const TRENDING_IDS = [
  "tt13186482", // Mufasa: Le Roi lion
  "tt9218128",  // Gladiator II
  "tt18412256", // Alien: Romulus
  "tt22022452", // Vice-Versa 2
  "tt6263850",  // Deadpool & Wolverine
  "tt11315808",   // Joker: Folie à Deux
  "tt4919268", // Bad Boys: Ride or Die
  "tt1262426",   // Wicked
  "tt14257582",   // Wolfs
  "tt15314262",   // The Beekeeper
];

// Mot-clé utilisé pour la recherche des films de 2024
const SEARCH_QUERY_2024 = "love";

const moviesList = document.getElementById("movies-list");
const message = document.getElementById("movies-message");
const loadMoreButton = document.getElementById("load-more");

// Identifiants des films déjà affichés (pour éviter les doublons)
const displayedIds = new Set();

let currentPage = 1;
let loadedCount = 0;

// Ajoute des films à la suite de la liste, sans afficher deux fois le même
function addMovies(movies) {
  const newMovies = movies.filter((movie) => !displayedIds.has(movie.imdbID));

  newMovies.forEach((movie) => displayedIds.add(movie.imdbID));

  moviesList.insertAdjacentHTML(
    "beforeend",
    newMovies.map(createMovieCard).join("")
  );
}

// Affiche les films tendances au chargement de la page
async function loadTrendingMovies() {
  try {
    const movies = await Promise.all(
      TRENDING_IDS.map((id) => getMovieById(id, "short"))
    );

    // On garde uniquement les films que l'API a bien trouvés
    const validMovies = movies.filter((movie) => movie.Response !== "False");

    if (validMovies.length === 0) {
      message.textContent = "Impossible de charger les films tendances.";
      return;
    }

    addMovies(validMovies);
  } catch (error) {
    message.textContent = "Erreur lors du chargement des films.";
    console.error(error);
  }
}

// Charge 10 films de 2024 de plus au clic sur le bouton
async function loadMore2024Movies() {
  loadMoreButton.disabled = true;

  try {
    const data = await searchMovies(SEARCH_QUERY_2024, currentPage, "2024", "movie");

        if (data.Response === "False") {
      // data.Error contient la raison donnée par l'API en cas d'erreur de chargement
      if (data.Error === "Movie not found!") {
        message.textContent = "Plus aucun film de 2024 à afficher.";
      } else {
        message.textContent = `Erreur de l'API : ${data.Error}`;
      }
      loadMoreButton.hidden = true;
      return;
    }

    // La recherche ne donne pas le résumé : on demande les détails de chaque film
    const details = await Promise.all(
      data.Search.map((movie) => getMovieById(movie.imdbID, "short"))
    );

    addMovies(details.filter((movie) => movie.Response !== "False"));

    loadedCount += data.Search.length;
    currentPage++;

    // On cache le bouton quand tous les films de 2024 sont affichés
    loadMoreButton.hidden = loadedCount >= Number(data.totalResults);
  } catch (error) {
    message.textContent = "Erreur lors du chargement des films.";
    console.error(error);
  } finally {
    loadMoreButton.disabled = false;
  }
}

loadMoreButton.addEventListener("click", loadMore2024Movies);

loadTrendingMovies();