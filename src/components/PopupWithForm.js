import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this.formElement = this._popupElement.querySelector('.form');
    this.handleFormSubmit = handleFormSubmit;
    this._formSubmitButton = this._popupElement.querySelector('.popup__container-button');
    this._inputElements = this.formElement.querySelectorAll('input');
  }

  close() {
    super.close();
    this.formElement.reset();
  }

  _getInputValues() {
    const inputValues = {};
    this._inputElements.forEach(input => {
      const name = input.name;
      const value = input.value;
      inputValues[name] = value;
    });
    return inputValues;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._formSubmitButton.textContent = 'Сохранение...';
    } else {
      this._formSubmitButton.textContent = 'Сохранить';
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this.formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleFormSubmit(this._getInputValues());
    });
  }
}
