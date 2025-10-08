const BASE_URL = "https://www.omdbapi.com/";
const API_KEY = "d7ad715c";

// DOM Elements
const searchForm = document.querySelector(".search__form");
const searchBar = document.getElementById("search-bar");
const main = document.querySelector("main");

// Form Submission Handler
// When user submits search, prevent default form behavior and fetch movie data
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getMovieData();
  searchBar.value = "";
});

// This approach is necessary because search results don't include all properties we need
async function getMovieData() {
  const userSearchInput = document.getElementById("search-bar").value;

  // First API call: Search for movies using '&s=' parameter
  // Returns an array of movies with basic info (Title, Year, imdbID, Poster, etc.)
  const searchResponse = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${userSearchInput}`
  );
  const data = await searchResponse.json();

  if (data.Search) {
    main.innerHTML = "";

    // Create an array of promises for detailed API calls
    // This can be thought of making multiple calls to the
    // movie api using all the ids found in the array of objects
    // received from the initial API call.
    const movieDetailsPromises = data.Search.map((movie) => {
      return getMovieDetails(movie.imdbID);
    });

    // Resolve all movie detail promises into an array of movie objects
    const detailedMovies = await Promise.all(movieDetailsPromises);

    // now we can render all the movies with the required props
    renderMovies(detailedMovies);
  }
}

// Second API Call Function
// Uses '&i=' query parameter with imdbID to get comprehensive movie details
// This provides properties not available in search results: Runtime, Genre, Plot, imdbRating, etc.
async function getMovieDetails(imdbID) {
  const detailResponse = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}`
  );
  return await detailResponse.json();
}

// Render Function
// Takes the array of detailed movie objects and displays them on the page
function renderMovies(movies) {
  movies.forEach((movie) => {
    // Replace missing posters with default image
    if (movie.Poster === "N/A" || !movie.Poster) {
      movie.Poster = "./images/mvwl-default-poster.jpg";
    }

    const movieSection = document.createElement("section");
    movieSection.classList.add("movies-section");
    movieSection.innerHTML = `
      <section class="movies">
          <img class="movies__poster" src="${movie.Poster}" onerror="this.src='./images/mvwl-default-poster.jpg'" alt="Movie Poster for ${movie.Title}"/>
      <div class="movies__description">
        <h2 class="movies__description--title">${movie.Title}</h2>
        <p class="movies__description--info">
          <span id="movie-time">${movie.Runtime}</span>
          <span id="movie-genre">${movie.Genre}</span>
          <span id="movie-rating">⭐ ${movie.imdbRating}</span>
        </p>
        <p class="movies__description--plot">${movie.Plot}</p>
        <button id="movie-watchlist"><i class="fa-solid fa-plus"></i> Watchlist</button>
      </div>
       </section>
    `;
    main.appendChild(movieSection);
  });
}
