export class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  // Метод для проверки ответа от сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Метод для получения карточек с сервера
  async getCards() {
    const res = await fetch(`${this.url}/cards`, {
      headers: this.headers
    });
    return this._checkResponse(res);
  }

  // Метод для добавления новой карточки на сервер
  async addCard(name, link) {
    const res = await fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    });
    return this._checkResponse(res);
  }

  // Метод для обновления информации о пользователе на сервере
  async updateProfile(name, about) {
    const res = await fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    });
  
    const data = await this._checkResponse(res);
    return data;
  }

  // Метод для получения информации о пользователе с сервера
  async getUserInfo() {
    const res = await fetch(`${this.url}/users/me`, {
      headers: this.headers
    });
    return this._checkResponse(res);
  }

  // Метод для удаления карточки с сервера
  async deleteCard(cardId) {
    const res = await fetch(`${this.url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    });
    return this._checkResponse(res);
  }

  async addLike(cardId) {
    const res = await fetch(`${this.url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.headers
    });
    return this._checkResponse(res);
  }

  async deleteLike(cardId) {
    const res = await fetch(`${this.url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    });
    return this._checkResponse(res);
  }

  async updateAvatar(avatarLink) {
    const res = await fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    });
    return this._checkResponse(res);
  }
}
