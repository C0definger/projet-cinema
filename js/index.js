import { searchMovies } from "./api.js";
import { createMovieCard } from "./ui.js";


const TRENDING_QUERY = "star wars";

const moviesList = document.getElementById("movies-list");
const message = document.getElementById("movies-message");
const loadMoreButton = document.getElementById("load-more");

let currentPage = 1;
let loadedCount = 0;


async function loadMovies() {
  loadMoreButton.disabled = true;

  try {
    const data = await searchMovies(TRENDING_QUERY, currentPage);

    if (data.Response === "False") {
      message.textContent = "Aucun film trouvé.";
      loadMoreButton.hidden = true;
      return;
    }

    moviesList.insertAdjacentHTML(
      "beforeend",
      data.Search.map(createMovieCard).join("")
    );

    loadedCount += data.Search.length;

    // On cache le bouton quand tous les films sont affichés
    loadMoreButton.hidden = loadedCount >= Number(data.totalResults);
  } catch (error) {
    message.textContent = "Erreur lors du chargement des films.";
    console.error(error);
  } finally {
    loadMoreButton.disabled = false;
  }
}

loadMoreButton.addEventListener("click", () => {
  currentPage++;
  loadMovies();
});

loadMovies();