const BASE_URL = "https://www.omdbapi.com/";
const API_KEY = "d7ad715c";

// DOM Elements
const searchForm = document.querySelector(".search__form");
const searchBar = document.getElementById("search-bar");
const main = document.querySelector("main");

let movieObject = {};

// Form Submission Handler
// When user submits search, prevent default form behavior and fetch movie data
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getMovieData();
  searchBar.value = "";
});

document.addEventListener("click", (e) => {
  const button = e.target.closest("#movie-watchlist");
  if (button) {
    // const movieSection = e.target.closest(".movies-section");
    // const movieTitle = movieSection.querySelector(
    //   ".movies__description--title"
    // ).textContent;
    const imdbID = button.dataset.imdbId;

    const movieToAdd = movieObject.find((movie) => movie.imdbID === imdbID);

    if (movieToAdd) {
      const wasAdded = saveToWatchlist(movieToAdd);

      if (wasAdded) {
        button.innerHTML = `<i class="fa-solid fa-check"></i> Added!`;
        // setTimeout(() => {
        //   e.target.innerHTML = `<i class="fa-solid fa-plus"></i> CLICKED THIS ONE`;
        // }, 2000);
      } else {
        button.innerHTML = alert(
          "This movie was already added to the watchlist. They might contain the same id..."
        );
        setTimeout(() => {
          button.innerHTML = `<i class="fa-solid fa-check"></i> Added!`;
        }, 1000);
      }
    }
  }
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

    movieObject = detailedMovies.map((movie) => {
      return {
        imdbID: movie.imdbID,
        poster: movie.Poster,
        title: movie.Title,
        genre: movie.Genre,
        imdbRating: movie.imdbRating,
        runtime: movie.Runtime,
        plot: movie.Plot,
      };
    });

    // now we can render all the movies with the required props
    renderMovies(detailedMovies);
  } else {
    main.innerHTML = "";
    main.innerHTML = `
          <div class="default-background error">
            <p class="error-message">Unable to find what you're
            looking for. Please try another search.</p>
          </div>
      `;
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
      <section id="movies" class="movies">
          <img class="movies__poster" src="${movie.Poster}" onerror="this.src='./images/mvwl-default-poster.jpg'" alt="Movie Poster for ${movie.Title}"/>
          <section class="movies__description">
            <div class="title-container">
              <h2 class="movies__description--title">${movie.Title}</h2>
              <span id="movie-rating">⭐ ${movie.imdbRating}</span>
            </div>
            <p class="movies__description--info">
              <span id="movie-time">${movie.Runtime}</span>
              <span id="movie-genre">${movie.Genre}</span>
              <button id="movie-watchlist" data-imdb-id="${movie.imdbID}"><i class="fa-solid fa-plus"></i> Watchlist</button>
            </p>
            <p class="movies__description--plot">${movie.Plot}</p>
          </section>
       </section>
    `;
    main.appendChild(movieSection);
  });
}
