# Complete localStorage Flow Breakdown 📚

## PHASE 1: SETTING UP THE DATA STRUCTURE

### Step 1: Creating the Movie Objects (index.js lines 75-85)
```javascript
movieObject = detailedMovies.map((movie) => {
  return {
    imdbID: movie.imdbID,      // Unique identifier
    poster: movie.Poster,      // Movie poster URL
    title: movie.Title,        // Movie title
    genre: movie.Genre,        // Movie genres
    imdbRating: movie.imdbRating, // IMDb rating
    runtime: movie.Runtime,    // Movie duration
    plot: movie.Plot,          // Movie plot summary
  };
});
```

**What happens**:
- Takes API response data and transforms it into a simplified object
- Uses lowercase property names (different from API's uppercase)
- Stores this array in global `movieObject` variable for later access

---

## PHASE 2: SAVING TO LOCALSTORAGE

### Step 2: User Clicks "Watchlist" Button (index.js lines 20-42)
```javascript
document.addEventListener("click", (e) => {
  const button = e.target.closest("#movie-watchlist");
  if (button) {
    // Find the movie section that contains this button
    const movieSection = e.target.closest(".movies-section");

    // Get the movie title from the DOM
    const movieTitle = movieSection.querySelector(".movies__description--title").textContent;

    // Find the matching movie object from our array
    const movieToAdd = movieObject.find((movie) => movie.title === movieTitle);
```

**Logic**: Uses event delegation to listen for clicks anywhere on the page, then checks if the clicked element is within a watchlist button.

### Step 3: Calling the Save Function (index.js line 29)
```javascript
if (movieToAdd) {
  const wasAdded = saveToWatchlist(movieToAdd);
```

**What happens**: Passes the movie object to the `saveToWatchlist()` function in `shared.js`.

### Step 4: The Save Function Logic (shared.js lines 5-13)
```javascript
const saveToWatchlist = (movie) => {
  // 1. Get existing watchlist from localStorage (or empty array if none exists)
  const watchlist = getWatchlistFromStorage();

  // 2. Check if movie already exists (prevent duplicates)
  if (!watchlist.find((item) => item.imdbID === movie.imdbID)) {
    // 3. Add new movie to the array
    watchlist.push(movie);

    // 4. Save updated array back to localStorage
    localStorage.setItem("watchlist", JSON.stringify(watchlist));

    return true; // Success!
  }
  return false; // Already exists
};
```

**localStorage Operations**:
- **`localStorage.getItem("watchlist")`**: Retrieves stored data as string
- **`JSON.parse()`**: Converts string back to JavaScript array
- **`JSON.stringify()`**: Converts array to string for storage
- **`localStorage.setItem()`**: Saves the string to browser storage

---

## PHASE 3: RETRIEVING FROM LOCALSTORAGE

### Step 5: Loading Watchlist on Page Load (watchlist.js lines 4-6)
```javascript
document.addEventListener("DOMContentLoaded", () => {
  renderWatchlist();
});
```

**What happens**: When `watchlist.html` loads, it automatically calls `renderWatchlist()`.

### Step 6: Getting Data from localStorage (watchlist.js line 15)
```javascript
function renderWatchlist() {
  const watchlist = getWatchlistFromStorage();
```

**Calls**: `getWatchlistFromStorage()` from `shared.js`.

### Step 7: The Get Function (shared.js lines 1-3)
```javascript
const getWatchlistFromStorage = () => {
  return JSON.parse(localStorage.getItem("watchlist") || "[]");
};
```

**Logic**:
- Gets the stored string from localStorage
- Converts it back to an array using `JSON.parse()`
- If no data exists, returns empty array `[]`

---

## PHASE 4: RENDERING THE WATCHLIST

### Step 8: Rendering Movies (watchlist.js lines 17-50)
```javascript
if (watchlist.length === 0) {
  // Show empty state
  main.innerHTML = `<div class="default-background">...empty message...</div>`;
  return;
}

// For each movie in watchlist, create HTML
watchlist.forEach((movie) => {
  const movieSection = document.createElement("section");
  movieSection.innerHTML = `
    <img src="${movie.poster}" .../>
    <h2>${movie.title}</h2>
    <button class="remove-btn" data-imdb-id="${movie.imdbID}">Remove</button>
    <!-- etc... -->
  `;
  main.appendChild(movieSection);
});
```

**What happens**: Creates DOM elements for each movie, using the data from localStorage.

---

## PHASE 5: REMOVING FROM LOCALSTORAGE

### Step 9: User Clicks Remove Button (watchlist.js lines 9-14)
```javascript
document.addEventListener("click", (e) => {
  if (e.target.closest(".remove-btn")) {
    // Get the movie ID from the button's data attribute
    const imdbID = e.target.closest(".remove-btn").dataset.imdbId;

    // Remove from localStorage
    removeFromWatchlist(imdbID);

    // Re-render the list
    renderWatchlist();
  }
});
```

### Step 10: The Remove Function (shared.js lines 15-19)
```javascript
const removeFromWatchlist = (imdbID) => {
  // 1. Get current watchlist
  const watchlist = getWatchlistFromStorage();

  // 2. Filter out the movie with matching ID
  const updatedWatchlist = watchlist.filter((movie) => movie.imdbID !== imdbID);

  // 3. Save the filtered array back to localStorage
  localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
};
```

**Logic**: Uses `filter()` to create a new array without the removed movie, then saves it back.

---

## KEY LOCALSTORAGE CONCEPTS:

### 1. Data Persistence
- **localStorage** survives browser refreshes and closes
- Data is stored as **strings only**
- Must use `JSON.stringify()` to save objects/arrays
- Must use `JSON.parse()` to retrieve objects/arrays

### 2. Storage Limits
- ~5-10MB per domain
- Stored per origin (protocol + domain + port)

### 3. Data Types
```javascript
// ❌ Won't work - objects aren't strings
localStorage.setItem("movie", {title: "Inception"});

// ✅ Works - convert to string first
localStorage.setItem("movie", JSON.stringify({title: "Inception"}));

// ✅ Retrieve and convert back
const movie = JSON.parse(localStorage.getItem("movie"));
```

### 4. Browser DevTools Inspection
- Open DevTools → Application → Local Storage
- You can see, edit, and delete stored data manually

### 5. Error Handling
- Always provide fallback: `localStorage.getItem("key") || "default"`
- Check for `null` values when parsing

Your implementation follows best practices: unique IDs, duplicate prevention, proper JSON handling, and clean separation of concerns! 🎬✨