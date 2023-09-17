// constants.js
export const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-72',
  headers: {
    authorization: 'fd0f9f25-2a5d-4f26-a017-454ad9a03645',
    'Content-Type': 'application/json'
  }
};

export const cardTemplate = document.querySelector('.card').content;
export const popupInputName = document.querySelector('.popup__input_type_name');
export const popupInputJob = document.querySelector('.popup__input_type_job');
export const profileTitle = document.querySelector('.profile__info-title');
export const profileSubtitle = document.querySelector('.profile__info-subtitle');
export const profileAvatar = document.querySelector('.profile__avatar');
export const openProfileEditPopup = document.querySelector('.profile__info-edit-button');
export const formProfileElement = document.forms.profileForm;
export const openCardPopup = document.querySelector('.profile__add-button');
export const formCardElement = document.forms.placeForm;
