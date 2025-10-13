// js/watchlist.js
const main = document.querySelector(".watchlist-main");

// Load and render watchlist on page load
document.addEventListener("DOMContentLoaded", () => {
  renderWatchlist();
});

// Handle remove buttons
document.addEventListener("click", (e) => {
  if (e.target.closest(".remove-btn")) {
    const imdbID = e.target.closest(".remove-btn").dataset.imdbId;
    removeFromWatchlist(imdbID);
    renderWatchlist(); // Re-render after removal
  } else if (e.target.closest("#add-to-watchlist")) {
    window.location.href = "../index.html";
  }
});

function renderWatchlist() {
  const watchlist = getWatchlistFromStorage();

  if (watchlist.length === 0) {
    main.innerHTML = `
        <div class="default-background">
          <p class="default-message">Your watchlist is looking a little empty...</p>
          <button id="add-to-watchlist"><i class="fa-solid fa-plus"></i> Let's add some movies!</button>
        </div>
      `;
    return;
  }

  main.innerHTML = "";
  watchlist.forEach((movie) => {
    // Similar rendering logic but with remove button instead of add
    const movieSection = document.createElement("section");
    movieSection.classList.add("movies-section");
    movieSection.innerHTML = `
      <section class="movies">
        <img class="movies__poster" src="${movie.poster}" onerror="this.src='../images/mvwl-default-poster.jpg'" alt="Movie Poster for ${movie.title}"/>
        <section class="movies__description">
          <div class="title-container">
            <h2 class="movies__description--title">${movie.title}</h2>
            <span id="movie-rating">⭐ ${movie.imdbRating}</span>
          </div>
          <p class="movies__description--info">
            <span id="movie-time">${movie.runtime}</span>
            <span id="movie-genre">${movie.genre}</span>
            <button class="remove-btn" data-imdb-id="${movie.imdbID}">
              <i class="fa-solid fa-minus"></i> Remove
            </button>
          </p>
          <p class="movies__description--plot">${movie.plot}</p>
        </section>
      </section>
    `;
    main.appendChild(movieSection);
  });
}
