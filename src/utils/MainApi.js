class Api {
    constructor({ baseUrl, headers }) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    _checkResponse(res) {
      if (res.ok) {
        return res.json();
      }
  
      return res.json()
            .then(err => Promise.reject(err))
    }
  
    getCurrentUserInfo(token) {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: { ...this._headers, Authorization: `Bearer ${token}` },
      }).then((res) => this._checkResponse(res));
    }
  
    editCurrentUserInfo({ name, email }, token) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: { ...this._headers, Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name,
          email,
        }),
      }).then((res) => this._checkResponse(res));
    }
  
    getSavedMovies(token) {
      return fetch(`${this._baseUrl}/movies`, {
        method: "GET",
        headers: { ...this._headers, Authorization: `Bearer ${token}` },
      }).then((res) => this._checkResponse(res));
    }
  
    createMovie(movieInfo, token) {
      return fetch(`${this._baseUrl}/movies`, {
        method: "POST",
        headers: { ...this._headers, Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          ...movieInfo,
        }),
      }).then((res) => this._checkResponse(res));
    }
  
    removeMovie(movieId, token) {
      return fetch(`${this._baseUrl}/movies/${movieId}`, {
        method: "DELETE",
        headers: { ...this._headers, Authorization: `Bearer ${token}` },
      }).then((res) => this._checkResponse(res));
    }
  }
  
  export const mainApi = new Api({
    baseUrl: "https://api.movies-neonbonesjs.nomoredomains.work",
    headers: {
      "Content-Type": "application/json",
    },
  });