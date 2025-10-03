const BASE_URL = "https://www.omdbapi.com/";
const API_KEY = "d7ad715c";
const searchForm = document.querySelector(".search__form");
const searchBar = document.getElementById("search-bar");
const main = document.querySelector("main");

async function getMovieDatabase() {
  const response = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${searchBar.value}`
  );
  const data = await response.json();
  console.log(data);

  // STOPPED HERE: NEED TO FIGURE OUT HOW TO RENDER
  // OUT THE TITLES IN THE ARRAY
}

const handleSubmit = (e) => {
  e.preventDefault();
  getMovieDatabase();
  console.log("hello!");
  console.log(searchBar.value);
};

searchForm.addEventListener("submit", handleSubmit);

// const div = document.createElement("div");
// div.classList.add("test-div");

// main.appendChild(div);
