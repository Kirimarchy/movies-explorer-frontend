import { BASE_URL } from '../constants.js';

class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  async _getResponse(res) {
    const response = await res.json();
    console.log('#response:', response);
    return res.ok ? result : Promise.reject(response.message);
  }

  registerUser(name, email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name, email, password,}),
    }).then(res => this._getResponse(res));
  }


  loginUser(email, password) {
    return 
        fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        }).then(res => this._getResponse(res));
  }

  updateUserProfile(name, email) {
    return 
        fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        }).then(res => this._getResponse(res));
  }

  getUser() {
    return 
        fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        }).then(res => this._getResponse(res));
  }
}

export const MainApi = new Api({baseUrl: BASE_URL});
