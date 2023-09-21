import React, {  useRef } from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarInputRef = useRef();

  
  function handleSubmit(e) {
    e.preventDefault();
    const newAvatar = avatarInputRef.current.value;
    onUpdateAvatar( newAvatar
    );
  } 
  
  

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatarForm"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <span id="formAvatar-error" className="error"></span>
      <input ref={avatarInputRef}  className="popup__input popup__input_type_avatar" type="url" name="formAvatar" placeholder="Ссылка на аватар" required />
      
    </PopupWithForm>
  );
}