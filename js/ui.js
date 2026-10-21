// Image de remplacement quand un film n'a pas d'affiche
export const NO_POSTER = "https://placehold.co/300x445?text=Pas+d%27affiche";

// Construit le HTML d'une carte de film
export function createMovieCard(movie) {
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