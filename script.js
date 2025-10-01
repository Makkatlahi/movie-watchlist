async function getMovieDatabase() {
  const response = await fetch(
    "https://www.omdbapi.com/?apikey=d7ad715c&t=Guardians_of_the_galaxy_vol._2"
  );
  const data = await response.json();
  console.log(data);
}
getMovieDatabase();
