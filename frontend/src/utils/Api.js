export default class Api {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
    }
    _checkRes(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Что-то пошло не так...: ${res.status}`);
    }
    getUserInfo() {
      const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/users/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json'
          }
        })
        .then(this._checkRes);
    }

    getInitialCards() {
      const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/cards`, {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-type': 'application/json'
          }
        })
        .then(this._checkRes);
    }

    getDataFromServer() {
        return Promise.all([this.getInitialCards(), this.getUserInfo()])
    }

    addCard(name, link) {
      const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
              authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              link: link
        })
        })
        .then(this._checkRes);
    }

    changeAvatar(avatar) {
      const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
              authorization: `Bearer ${token}`,
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              avatar
            })
        })
        .then(this._checkRes);
    }

    changeUserInfo(name, about) {
      const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/users/me`,{
            method: 'PATCH',
            headers: {
              authorization: `Bearer ${token}`,
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name,
                about
            })
        })
        .then(this._checkRes);
    }

    deleteCard(_id) {
      const token = localStorage.getItem('jwt');
        return fetch(`${this._baseUrl}/cards/${_id}`, {
            method: 'DELETE',
            headers: {
              authorization: `Bearer ${token}`,
              'Content-type': 'application/json'
            },
        })
            .then(this._checkRes);
    }
    addLike(_id) {
      const token = localStorage.getItem('jwt');
      return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
          method: 'PUT',
          headers: {
            authorization: `Bearer ${token}`,
            'Content-type': 'application/json'
          },
      })
      .then(this._checkRes);
  }

  deleteLike(_id) {
    const token = localStorage.getItem('jwt');
      return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${token}`,
            'Content-type': 'application/json'
          },
      })
      .then(this._checkRes);
  }
  changeLikeCardStatus(_id, isLiked) {
      if (!isLiked) {
        return this.addLike(_id);
      } else{
        return this.deleteLike(_id);
      }
  }
}

export const api = new Api({
  baseUrl: 'https://api.snooper227.nomoredomains.rocks'
});
