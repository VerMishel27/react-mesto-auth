class Api {

    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    #onResponce(res) {
        return res.ok ? res.json() : res.json().then(errData => Promise.reject(errData))
    }

    dataProfile(data) {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this.#onResponce)
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers 
        })
            .then(this.#onResponce)
    }

    addCard(data) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this.#onResponce)
    }

    editingProfile(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this.#onResponce)
    }

    avatarProfile(data) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then(this.#onResponce)
    }

    removeCard(idCard) {
        return fetch(`${this._url}/cards/${idCard}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this.#onResponce)
    }

    addLike(idCard) {
        return fetch(`${this._url}/cards/${idCard}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(this.#onResponce)
    }

    delLike(idCard) {
        return fetch(`${this._url}/cards/${idCard}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this.#onResponce)
    }
    
}

const configApi = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-73',
  headers: {
    authorization: 'da96f1c4-c52a-4b63-8218-e123775712c9',
    "Content-Type": "application/json"
  }
}

const api = new Api(configApi)
export default api;