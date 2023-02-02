import { MOVIES_URL } from './constants';

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  async _getResponse(res) {
    const response = await res.json();
    return res.ok ? response : Promise.reject(res);
  }

  getAllMovies() {
    return fetch(`${this._baseUrl}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => this._getResponse(res));
  }
}

export const MoviesApi = new Api({ baseUrl: MOVIES_URL });
