import { searchMovies } from "./api.js";
import { createMovieCard } from "./ui.js";

const searchInput = document.getElementById("search-input");
const message = document.getElementById("search-message");
const results = document.getElementById("search-results");
const loadMoreButton = document.getElementById("load-more");

let timeoutId;
let currentQuery = "";
let currentPage = 1;
let loadedCount = 0;

// Charge la page courante de la recherche courante et AJOUTE les films
async function loadResults() {
  const query = currentQuery;
  loadMoreButton.disabled = true;
  message.textContent = "Chargement...";

  try {
    const data = await searchMovies(query, currentPage);

    // Une recherche plus récente a pris le relais : on ignore cette réponse
    if (query !== currentQuery) {
      return;
    }

    if (data.Response === "False") {
      message.textContent = "Aucun film trouvé.";
      loadMoreButton.hidden = true;
      return;
    }

    results.insertAdjacentHTML(
      "beforeend",
      data.Search.map(createMovieCard).join("")
    );

    loadedCount += data.Search.length;
    const total = Number(data.totalResults);

    message.textContent = `${total} résultat(s)`;
    loadMoreButton.hidden = loadedCount >= total;
  } catch (error) {
    message.textContent = "Erreur lors de la recherche.";
    console.error(error);
  } finally {
    loadMoreButton.disabled = false;
  }
}

// Démarre une nouvelle recherche : on remet tout à zéro
function startSearch(query) {
  currentQuery = query;
  currentPage = 1;
  loadedCount = 0;
  results.innerHTML = "";
  loadMoreButton.hidden = true;

  if (query.length < 3) {
    message.textContent = "Tape au moins 3 caractères.";
    return;
  }

  loadResults();
}

// À chaque frappe, on attend 400 ms sans nouvelle frappe avant de chercher
searchInput.addEventListener("input", () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    startSearch(searchInput.value.trim());
  }, 400);
});

loadMoreButton.addEventListener("click", () => {
  currentPage++;
  loadResults();
});