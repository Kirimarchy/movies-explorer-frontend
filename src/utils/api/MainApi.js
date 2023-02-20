import { BASE_URL } from '../constants.js';

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  async _getResponse(res) {
    const response = await res.json();
    return res.ok ? response : Promise.reject(response.message);
  }

//auth
  registerUser(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
    }).then(res => this._getResponse(res));
  }


  loginUser(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
    }).then(res => this._getResponse(res));
  }

  updateUserProfile(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
    }).then(res => this._getResponse(res));
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
    }).then(res => this._getResponse(res));
  }


//cards
  getUserMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(res => this._getResponse(res));
  }


  saveMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailerLink: movie.trailerLink,
        thumbnail: movie.thumbnail,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    }).then(res => this._getResponse(res));
  }

  deleteMovie(movie) {
    return fetch(`${this._baseUrl}/movies/${movie._id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(res => this._getResponse(res));
  }
}  

export const MainApi = new Api({baseUrl: BASE_URL});
