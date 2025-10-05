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
  const section = document.createElement("section");
  section.classList.add("movies-section");
  data.Search.forEach((movie) => {
    section.innerHTML += `
        <section class="movies">
          <img class="movies__poster" src="${movie.Poster}" alt="Movie Poster for ${movie.Title}"/>
          <div class="movies__description">
            <h2 class="movies__description--title">${movie.Title}</h2>
            <p class="movies__description--info"><span id="movie-time">116m</span> <span id="movie-genre">Action, Drama, Mystery<span></p>
            <p class="movies__description--plot">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus reprehenderit iusto molestiae! Consequatur soluta nisi, fuga dignissimos accusantium.</p>
          </div>
        </section>
      `;
    main.appendChild(section);
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
