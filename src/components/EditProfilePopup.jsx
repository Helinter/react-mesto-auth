import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentUser.name !== undefined && currentUser.about !== undefined) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profileForm"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <span id="formName-error" className="error"></span>
      <input
        className="popup__input popup__input_type_name"
        minLength="2"
        maxLength="40"
        type="text"
        name="formName"
        required
        placeholder="Имя"
        value={name}
        onChange={handleNameChange}
      />
      <input
        className="popup__input popup__input_type_job"
        minLength="2"
        maxLength="200"
        type="text"
        name="formJob"
        required
        placeholder="Профессия"
        value={description}
        onChange={handleDescriptionChange}
      />
      <span id="formJob-error" className="error"></span>
    </PopupWithForm>
  );
}
