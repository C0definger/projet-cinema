// Image de remplacement quand un film n'a pas d'affiche
export const NO_POSTER = "https://placehold.co/300x445?text=Pas+d%27affiche";

// Construit le HTML d'une carte de film
export function createMovieCard(movie) {
  const poster = movie.Poster !== "N/A" ? movie.Poster : NO_POSTER;

  // Le résumé n'existe que si on a demandé les détails du film
  const summary =
    movie.Plot && movie.Plot !== "N/A"
      ? `<p class="movie-plot">${movie.Plot}</p>`
      : "";

  return `
    <article class="movie-card">
      <a href="movie.html?id=${movie.imdbID}">
        <img src="${poster}" alt="Affiche de ${movie.Title}">
      </a>
      <div class="movie-card-body">
        <h3>${movie.Title}</h3>
        <p class="movie-year">${movie.Year}</p>
        ${summary}
        <a class="more-link" href="movie.html?id=${movie.imdbID}">En savoir plus</a>
      </div>
    </article>
  `;
}