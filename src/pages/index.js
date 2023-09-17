//IMPORT
import { apiConfig, cardTemplate, popupInputName, popupInputJob, profileTitle, profileSubtitle, profileAvatar, openProfileEditPopup, formProfileElement, openCardPopup, formCardElement } from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { config } from "../vendor/config.js";
import Section from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import './index.css';
import { Api } from '../components/Api.js';
const api = new Api(apiConfig);

const userInfo = new UserInfo({
  nameSelector: '.profile__info-title',
  infoSelector: '.profile__info-subtitle',
  avatarSelector: '.profile__avatar'
});
export const data = {};
let myId;

//ПОЛУЧЕНИЕ ДАННЫХ О ПОЛЬЗОВАТЕЛЕ С СЕРВЕРА
const externalIdPromise = api.getUserInfo()
  .then(result => {
    const profileInformation = result;
    userInfo.setUserInfo(profileInformation); // Используем метод setUserInfo
    myId = profileInformation._id;
    return myId;
  });

externalIdPromise.then((myId) => {
  console.log(myId);
  const popupFormProfile = new PopupWithForm('.popup_type_edit-profile', (inputValues) => {
    popupFormProfile.renderLoading(true);

    const newName = inputValues.formName;
    const newAbout = inputValues.formJob;

    api.updateProfile(newName, newAbout)
      .then((result) => {
        userInfo.setUserInfo(result); // Обновление всех данных пользователя
        popupFormProfile.close();
      })
      .catch(error => {
        console.error('Ошибка при обновлении профиля:', error);
      })
      .finally(() => {
        popupFormProfile.renderLoading(false);
      });
  });
  popupFormProfile.setEventListeners();

  // Forms
  openProfileEditPopup.addEventListener('click', () => {
    const currentName = userInfo.getUserInfo().name;
    const currentJob = userInfo.getUserInfo().info;
    popupInputName.value = currentName;
    popupInputJob.value = currentJob;
    popupFormProfile.open();
  });

  openCardPopup.addEventListener('click', () => {
    popupFormPlace.open();
  });

  function enableValidation(formItem) {
    const form = new FormValidator(config, formItem);
    form.enableValidation();
    formItem.addEventListener('submit', () => {
      form.buttonDisabled();
    });
  }

  const popupFormPlace = new PopupWithForm('.popup_type_card', (inputValues) => {
    popupFormPlace.renderLoading(true);

    const item = {
      name: inputValues.formPlace,
      link: inputValues.formLink,
      likes: [],
    };

    api.addCard(item.name, item.link)
      .then((newCard) => {
        item._id = newCard._id;
        item.ownerId = myId;
        renderNewCard(item, myId);
        popupFormPlace.close();
      })
      .catch(error => {
        console.error('Ошибка при добавлении карточки:', error);
      })
      .finally(() => {
        popupFormPlace.renderLoading(false);
      });
  });

  popupFormPlace.setEventListeners();

  const popupCard = new PopupWithImage('.popup_type_image');
  popupCard.setEventListeners();

  

  enableValidation(formProfileElement);
  enableValidation(formCardElement);

  let renderCards;

  //ПОЛУЧЕНИЕ КАРТОЧЕК С СЕРВЕРА
  api.getCards()
    .then((res) => {
      const cardsFromServer = res;
      const cards = cardsFromServer.map(card => ({
        name: card.name,
        link: card.link,
        likes: card.likes,
        ownerId: card.owner._id,
        _id: card._id
      }));

      renderCards = new Section(
        {
          items: cards,
          renderer: renderer,
        },
        '.elements'
      );

      renderCards.renderItems();
    })
    .catch(error => {
      console.error('Ошибка', error);
    });
    
  function handleCardClick(cardData) {
    popupCard.open(cardData);
  }

  const popupFormDelete = new PopupWithForm('.popup_type_delete', handleDeleteSubmit);
  popupFormDelete.setEventListeners();

  let cardForDelete;
  function handleDeleteClick(cardDelete) {
    popupFormDelete.open();
    cardForDelete = cardDelete;
  }

  function handleDeleteSubmit() {
    cardForDelete.deleteCard();
  }

  // Аватар пользователя
  const openAvatarPopup = document.querySelector('.profile__avatar-edit-icon');
  openAvatarPopup.addEventListener('click', function () {
    popupFormAvatar.open();
  });

  const popupFormAvatar = new PopupWithForm('.popup_type_edit-avatar', (inputValues) => {
    popupFormAvatar.renderLoading(true);

    const newAvatarLink = inputValues.formAvatar;

    api.updateAvatar(newAvatarLink)
      .then((result) => {
        userInfo.setUserInfo(result); // Обновление всех данных пользователя
        popupFormAvatar.close();
      })
      .catch(error => {
        console.error('Ошибка при обновлении аватара:', error);
      })
      .finally(() => {
        popupFormAvatar.renderLoading(false);
      });
  });

  popupFormAvatar.setEventListeners();

  //CARDS
  function createCard(item, myId) {
    const card = new Card(item, cardTemplate, handleCardClick, handleDeleteClick, myId, api, popupFormDelete);
    return card.createCard();
  }

  function renderer(item) {
    renderCards.addItem(createCard(item, myId), true);
  }

  function renderNewCard(item, myId) {
    const card = createCard(item, myId);
    renderCards.addItem(card, true);
  }
})
.catch(error => {
  console.error('Ошибка', error);
});
