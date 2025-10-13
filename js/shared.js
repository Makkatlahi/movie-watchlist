const getWatchlistFromStorage = () => {
  return JSON.parse(localStorage.getItem("watchlist") || "[]");
};

const saveToWatchlist = (movie) => {
  const watchlist = getWatchlistFromStorage();
  // create a find function that verifies whether the movie that is passed
  // is in the watchlist. If not, push it.
  if (!watchlist.find((item) => item.imdbID === movie.imdbID)) {
    watchlist.push(movie);
    // After we push the new movie title, we update the watchlist
    // in localStorage.
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    return true;
  }
  return false;
};

const removeFromWatchlist = (imdbID) => {
  const watchlist = getWatchlistFromStorage();
  // create a filter function that says "give me all the movies
  // that are not equal to the movie ID that I am passing through"
  const updatedWatchlist = watchlist.filter((movie) => movie.imdbID !== imdbID);
  // after we get that list, we update the localStorage with the new list
  localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
};
