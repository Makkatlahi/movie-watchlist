const BASE_URL = "https://www.omdbapi.com/";
const API_KEY = "d7ad715c";
const searchForm = document.querySelector(".search__form");
const searchBar = document.getElementById("search-bar");
const main = document.querySelector("main");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getMovieDatabase();
  searchBar.value = "";
});

const renderMovies = (data) => {
  main.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("movies");
  data.Search.forEach((movie) => {
    div.innerHTML += `
          <img src="${movie.Poster}" alt="Movie Poster for ${movie.Title}"/>
          <div class="movies__description">
            <h2 class="movies__description--title">${movie.Title}</h2>
          </div>
      `;
    main.appendChild(div);
  });
};

async function getMovieDatabase() {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${searchBar.value}`
  );
  const data = await response.json();
  console.log(data);

  // Check if search was successful and has results
  if (data.Response === "True" && data.Search) {
    renderMovies(data);
  } else {
    //need to add render this out to the DOM
    console.log("No movies found or error:", data.Error);
  }
}
