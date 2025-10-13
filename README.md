# Movie Watchlist App

A web application that allows users to search for movies using the OMDB API, add them to a personal watchlist, and manage their collection. Built with vanilla JavaScript, HTML, and CSS.

## Features

- 🔍 **Movie Search**: Search for movies by title using the OMDB API
- ➕ **Add to Watchlist**: Save movies to a personal watchlist stored in localStorage
- ❌ **Remove from Watchlist**: Remove movies from your watchlist
- 🖼️ **Default Posters**: Automatic fallback to default poster images when API posters are unavailable
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 💾 **Persistent Storage**: Watchlist data persists between browser sessions using localStorage

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **API**: OMDB API for movie data
- **Storage**: Browser localStorage for watchlist persistence
- **Icons**: Font Awesome for UI elements

## Setup Instructions

### Prerequisites
- A modern web browser
- Internet connection (for API calls)
- OMDB API key (free from [omdbapi.com](http://www.omdbapi.com/))

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/movie-watchlist.git
   cd movie-watchlist
   ```

2. **Get an OMDB API Key**:
   - Visit [omdbapi.com](http://www.omdbapi.com/)
   - Sign up for a free API key
   - Copy your API key

3. **Configure the API Key**:
   - Open `js/index.js`
   - Replace the existing API key with yours:
     ```javascript
     const API_KEY = "your_api_key_here";
     ```

4. **Open the Application**:
   - Open `index.html` in your web browser
   - Or use a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 8000

     # Using Node.js (if you have http-server installed)
     npx http-server
     ```

## Usage

### Searching for Movies
1. Enter a movie title in the search bar
2. Click the search button or press Enter
3. Browse the results displayed below

### Adding Movies to Watchlist
1. Click the "Watchlist" button on any movie card
2. The movie will be added to your personal watchlist
3. Button temporarily shows "Added!" confirmation

### Viewing Your Watchlist
1. Click "Search for movies" link in the navigation
2. Your saved movies will be displayed
3. Use the "Remove" button to delete movies from your watchlist

### Managing Your Watchlist
- Movies are automatically saved to your browser's localStorage
- Your watchlist persists between sessions
- Duplicate movies are prevented automatically

## Project Structure

```
movie-watchlist/
├── index.html              # Main search page
├── watchlist.html          # Watchlist display page
├── css/
│   ├── index.css          # Styles for search page
│   └── watchlist.css      # Styles for watchlist page
├── js/
│   ├── index.js           # Search page logic
│   ├── watchlist.js       # Watchlist page logic
│   └── shared.js          # Shared utilities (localStorage functions)
├── images/
│   └── mvwl-default-poster.jpg  # Default poster image
└── README.md              # This file
```

## API Information

This project uses the **OMDB API** (Open Movie Database):
- **Base URL**: `https://www.omdbapi.com/`
- **Endpoints Used**:
  - Search: `?s={movie_title}&apikey={key}`
  - Details: `?i={imdb_id}&apikey={key}`
- **Data Retrieved**: Title, poster, runtime, genre, IMDb rating, plot
- **Rate Limits**: 1,000 requests/day for free accounts

## Key Code Concepts

### localStorage Management
- Movies are stored as JSON strings in browser localStorage
- Functions in `shared.js` handle CRUD operations:
  - `getWatchlistFromStorage()`: Retrieves saved movies
  - `saveToWatchlist(movie)`: Adds movie if not duplicate
  - `removeFromWatchlist(imdbID)`: Removes specific movie

### Event Handling
- Uses event delegation for dynamic content
- Click handlers manage add/remove functionality
- Form submission prevents default behavior

### API Integration
- Two-step API process: search for movies, then fetch details
- Handles missing data (posters, ratings) gracefully
- Uses `Promise.all()` for parallel API calls

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -am 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## License

This project is open source and available under the MIT License.

---

**Note**: This is a front-end only application. All data is stored locally in the browser and will be lost if localStorage is cleared. For a production app, consider adding a backend database for persistent user accounts and watchlists.