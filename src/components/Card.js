export class Card {
  constructor(data, cardTemplate, handleCardClick, handleDeleteClick, myId, api, popupFormDelete) {
    this._popupFormDelete = popupFormDelete;
    this.id = data._id;
    this.myId = myId;
    this.api = api;
    this._cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._ownerId = data.ownerId; 
    this._titleImage = this._cardElement.querySelector('.element__image');
    this._deleteButton = this._cardElement.querySelector('.element__delete-button');
    this._likeButton = this._cardElement.querySelector('.element__like-button');
    this._likeCounter = this._cardElement.querySelector('.element__like-counter'); 
    this._listItem = this._deleteButton.closest('.element');
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._imageData = {
      link: this._link,
      name: this._name
    };
  }

  getCardId() {
    return this.id;
  }

  createCard() {
    this._htmlSettings();
    this._setEventListeners();
    if (this._ownerId !== this.myId) {
      this._deleteButton.remove();
    }
    if (this.isLikedByCurrentUser()) {
      this._likeButton.classList.add('element__like-button_active');
    } else {
      this._likeButton.classList.remove('element__like-button_active');
    }
  
    return this._cardElement;
  }
  


  _updateDeleteButton() {
    if (this._ownerId === this.myId) {
      this._cardElement.appendChild(this._deleteButton);
    } else {
      this._deleteButton.remove();
    }
  }

  _htmlSettings() {
    this._cardElement.querySelector('.element__title').textContent = this._name;
    this._titleImage.setAttribute('src', this._link);
    this._titleImage.setAttribute('alt', this._name);
    this._likeCounter.textContent = this._likes.length;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this.toggleLike());
    this._deleteButton.addEventListener('click', () => this._deleteOn());
    this._titleImage.addEventListener('click', () => this._popupImgOn());
  }

  _popupImgOn() {
    this._handleCardClick(this._imageData);
  }

  _deleteOn() {
    this._handleDeleteClick(this);
  }

  deleteCard() {
    this.api.deleteCard(this.id)
      .then(() => {
        this._listItem.remove();
        this._listItem = null;
        this._popupFormDelete.close(); // Закрываем модальное окно
        console.log('карточка удалена');
      })
      .catch(error => {
        console.error('Ошибка при удалении карточки:', error);
      });
}

  
  updateLikeCount() {
    this._likeCounter.textContent = this._likes.length;
  }

  isLikedByCurrentUser() {
    return this._likes.some(like => like._id === this.myId);
  }

  toggleLike() {
    if (this.isLikedByCurrentUser()) {
      this.api.deleteLike(this.id)
        .then((updatedCard) => {
          this._likes = updatedCard.likes;
          this.updateLikeCount();
          this._likeButton.classList.remove('element__like-button_active');
        })
        .catch(error => {
          console.error('Ошибка при снятии лайка:', error);
        });
    } else {
      this.api.addLike(this.id)
        .then((updatedCard) => {
          this._likes = updatedCard.likes;
          this.updateLikeCount();
          this._likeButton.classList.add('element__like-button_active');
        })
        .catch(error => {
          console.error('Ошибка при постановке лайка:', error);
        });
    }
  }
}
