const getWatchlistFromStorage = () => {
  return JSON.parse(localStorage.getItem("watchlist") || "[]");
};

const saveToWatchlist = (movie) => {
  const watchlist = getWatchlistFromStorage();

  if (!watchlist.find((item) => item.imdbID === movie.imdbID)) {
    watchlist.push(movie);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    return true;
  }
  return false;
};

const removeFromWatchlist = (imdbID) => {
  const watchlist = getWatchlistFromStorage();
  const updatedWatchlist = watchlist.filter((movie) => movie.imdbID !== imdbID);
  localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
};
