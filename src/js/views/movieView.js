import View from './View.js';
import { state } from '../model.js'

class MovieView extends View {
  _parentElement = document.querySelector('.movie');
  _errorMessage = 'We could not find that movie. Please try another one!';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {

    let genres = ''
    for (let i in this._data.genres) {
      if (state.genres.filter(e => e.id == this._data.genres[i])) {
        genres += state.genres[i].name + ' '
      }
    }

    return `
      <figure class="movie__fig">
        <img src="https://image.tmdb.org/t/p/w500/${this._data.image}" alt="${this._data.title}" class="movie__img" /> 
      </figure>

      <div class="movie__details">
        <div class="movie__title">
          <span>${this._data.title}</span>
          <p>${genres}</p>
        </div>
        <div class="bookmark">
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="src/img/icons.svg#icon-bookmark${this._data.bookmarked ? '-fill' : ''}"></use>
          </svg>
        </button>
        </div>
      </div>

      <div class="movie__desc">
        <h2 class="heading--2">Release Date: <span>${this._data.release_date}</span></h2>
        <h2 class="heading--2">Rating: <span>${this._data.rating}</span></h2>
        <h2 class="heading--2">Overview</h2>
            <div class="movie__description">
              ${this._data.overview}
            </div>
      </div>
    `;
  }
}

export default new MovieView();
