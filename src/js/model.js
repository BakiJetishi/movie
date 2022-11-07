import { API_URL, RES_PER_PAGE, API_KEY } from './config.js';
import { AJAX } from './helpers.js';

export const state = {
  movie: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
  genres: [{ id: 28, name: "Action" }, { id: 12, name: "Adventure" }, { id: 16, name: "Animation" }, { id: 35, name: "Comedy" }, { id: 80, name: "Crime" }, { id: 99, name: "Documentary" }, { id: 18, name: "Drama" }, { id: 10751, name: "Family" }, { id: 14, name: "Fantasy" }, { id: 36, name: "History" }, { id: 27, name: "Horror" }, { id: 10402, name: "Music" }, { id: 9648, name: "Mystery" }, { id: 10749, name: "Romance" }, { id: 878, name: "Science Fiction" }, { id: 10770, name: "TV Movie" }, { id: 53, name: "Thriller" }, { id: 10752, name: "War" }, { id: 37, name: "Western" }]
};

const createMovieObject = function (data) {
  return {
    id: data.id,
    title: data.original_title,
    image: data.poster_path,
    overview: data.overview,
    release_date: data.release_date,
    genres: data.genres,
    rating: data.vote_average
  };
};


export const loadmovie = async function (id) {
  try {
    const data = await AJAX(`${API_URL}3/movie/${id}${API_KEY}`);
    state.movie = createMovieObject(data);

    if (state.bookmarks.some(bookmark => bookmark.id === +id)) state.movie.bookmarked = true;
    else state.movie.bookmarked = false;

  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}3/search/movie${API_KEY}&query=${query}`);

    state.search.results = data.results.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        image: rec.poster_path,
        genres: rec.genre_ids,
        release_date: rec.release_date,
      };
    });

    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (movie) {
  // Add bookmark
  state.bookmarks.push(movie);

  // Mark current movie as bookmarked
  if (movie.id === state.movie.id) state.movie.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  // Delete bookmark
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current movie as NOT bookmarked
  if (id === state.movie.id) state.movie.bookmarked = false;

  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();