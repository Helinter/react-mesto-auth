export class FormValidator {
  constructor(config, formElement) {
    this._submitButton = document.getElementById('cardSubmit'),
    this._config = config,
      this._formElement = formElement,
      this._inputsList = this._formElement.querySelectorAll(this._config.inputSelector),
      this._submitButtonElement = this._formElement.querySelector(this._config.submitButtonSelector),
      this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector))
  }

  enableValidation() {
    this._setEventListeners();
  }

  _setEventListeners() {
        [...this._inputsList].forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._checkInputValidity(inputItem);
        this._toggleButtonState();
      })
    })
  }

  _toggleButtonState() {
    if (!this._formElement.checkValidity()) {
      this._submitButtonElement.disabled = true;
      this._submitButtonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      this._submitButtonElement.disabled = false;
      this._submitButtonElement.classList.remove(this._config.inactiveButtonClass);
    }
  }

  _checkInputValidity(inputItem) {
    this._errorElement = this._formElement.querySelector(`#${inputItem.name}-error`);
    const isInputValid = inputItem.validity.valid;
    if (!this._errorElement) return;

    if (!isInputValid) {
      this._showError(inputItem);
    }
    else {
      this._hideError(inputItem);
    }
  }

  _showError(inputItem) {
    inputItem.classList.add(this._config.inputErrorClass);
    this._errorElement.textContent = inputItem.validationMessage;
  }
  _hideError(inputItem) {
    inputItem.classList.remove(this._config.inputErrorClass);
    this._errorElement.textContent = inputItem.validationMessage;
  }
  buttonDisabled(){
    this._submitButton.classList.add(this._config.inactiveButtonClass);
    this._submitButton.disabled = true;
  }

}


  
  





