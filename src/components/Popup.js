export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
    this._closePopup = this._popupElement.querySelector('.popup__container-close-button');
    this._popupContainer = this._popupElement.querySelector('.popup__container');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
   
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose() {
    this._popupElement.addEventListener('click', (event) => {
      if (event.target === this._popupElement) {
        this.close();
      }
    });
  }

  setEventListeners() {
    this._closePopup.addEventListener('click', this.close.bind(this));
    this._handleOverlayClose();
  }
}





