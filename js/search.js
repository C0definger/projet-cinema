import { searchMovies } from "./api.js";
import { createMovieCard } from "./ui.js";

const searchInput = document.getElementById("search-input");
const message = document.getElementById("search-message");
const results = document.getElementById("search-results");

let timeoutId;

// Lance la recherche et affiche les résultats
async function runSearch(query) {
  if (query.length < 3) {
    results.innerHTML = "";
    message.textContent = "Tape au moins 3 caractères.";
    return;
  }

  message.textContent = "Chargement...";

  try {
    const data = await searchMovies(query);

    // Si l'utilisateur a continué à taper, on ignore cette réponse (elle est périmée)
    if (query !== searchInput.value.trim()) {
      return;
    }

    if (data.Response === "False") {
      results.innerHTML = "";
      message.textContent = "Aucun film trouvé.";
      return;
    }

    message.textContent = `${data.totalResults} résultat(s)`;
    results.innerHTML = data.Search.map(createMovieCard).join("");
  } catch (error) {
    message.textContent = "Erreur lors de la recherche.";
    console.error(error);
  }
}

// À chaque frappe, on attend 400 ms sans nouvelle frappe avant de chercher
searchInput.addEventListener("input", () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    runSearch(searchInput.value.trim());
  }, 400);
});