// API Configuration
// The OMDB API requires different query parameters for different types of requests:
// - '&s=' for searching movies by title/keyword (returns basic info + imdbID)
// - '&i=' for getting detailed info using the imdbID from search results
// - '&t=' for searching by exact title (alternative to search, but less flexible)
const BASE_URL = "https://www.omdbapi.com/";
const API_KEY = "d7ad715c";

// DOM Elements
const searchForm = document.querySelector(".search__form");
const main = document.querySelector("main");

// Form Submission Handler
// When user submits search, prevent default form behavior and fetch movie data
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getMovieData();
});

// Main API Function - Two-Step Process
// Step 1: Use '&s=' query to search for movies and get basic info + imdbIDs
// Step 2: Use each imdbID with '&i=' query to get detailed movie information
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
    // For each movie from search results, we need to make another API call
    // using the imdbID to get properties like Runtime, Genre, Plot, etc.
    const movieDetailsPromises = data.Search.map((movie) => {
      return getMovieDetails(movie.imdbID);
    });

    // Wait for ALL detail API calls to complete in parallel (much faster than sequential)
    // Promise.all() ensures we don't render until all movie details are fetched
    const detailedMovies = await Promise.all(movieDetailsPromises);

    // Now we have complete movie objects with all needed properties
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
      </div>
       </section>
    `;
    main.appendChild(movieSection);
  });
}
