import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = this._popupElement.querySelector('.popup__img');
    this._popupTitle = this._popupElement.querySelector('.popup__image-container-title');
  }

  open(cardData) {
    super.open();
    this._popupTitle.textContent = cardData.name;
    this._popupImg.src = cardData.link;
    this._popupImg.alt = cardData.name;
  }
}
