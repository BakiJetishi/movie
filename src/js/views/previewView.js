import View from './View.js';
import { state } from '../model.js'

class PreviewView extends View {
  _parentElement = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);

    let genres = ''
    for (let i in this._data.genres) {
      if (state.genres.filter(e => e.id == this._data.genres[i])) {
        genres += state.genres[i].name + ' '
      }
    }

    return `
      <li class="preview">
        <a class="preview__link ${this._data.id === +id ? 'preview__link--active' : ''}" href="#${this._data.id}">
          <figure class="preview__fig">
            <img src="https://image.tmdb.org/t/p/w500${this._data.image}" alt="${this._data.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${this._data.title}</h4>
            <p class="release__date" > ${genres}</p>
            <p class="release__date" > ${this._data.release_date.slice(0, -6)}</p>
          </div >
        </a >
      </li >
      `;
  }
}

export default new PreviewView();
