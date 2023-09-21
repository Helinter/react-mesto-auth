import React, { useState, useEffect, useContext } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import { api } from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);


  

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser((prevUser) => ({ ...prevUser, ...userData }));
        setCards(cardsData);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке данных:', error);
      });
  }, []);

  const handleLikeClick = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.error('Ошибка при загрузке данных:', error);
      });
  }

  const handleDeleteClick = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        // Создаем новый массив, исключая удаленную карточку
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((error) => {
        console.error('Ошибка при удалении карточки:', error);
      });
  };

  

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setImagePopupOpen(true);
  };
console.log(1)

  // Обработчики для открытия/закрытия попапов
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleUpdateUser = ({ name, about }) =>{
    api.updateProfile(name, about).then((res)=>{
      setCurrentUser(res)
      closeAllPopups();
    })
    .catch((error) => {
      console.error('Ошибка при обновлении данных о пользователе:', error);
    });
  }

  const handleUpdateAvatar = (newAvatar) => {
    api.updateAvatar(newAvatar)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((error) => {
        console.error('Ошибка при обновлении аватара:', error);
      });
  }
  
  const handleAddPlaceSubmit = ({name, link}) => {
    // Отправляем запрос на сервер для создания карточки
    api.addCard(name, link)
      .then((createdCard) => {
        // После успешного создания сервер вернет карточку с присвоенным _id
        setCards([createdCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.error('Ошибка при создании карточки:', error);
      });
  }
  


  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeletePopupOpen(false);
    setImagePopupOpen(false)
  };

  return (
   
      <div className="page">
        <Header linkTo="/sign-in" linkName="Выйти" email={currentUser.email}/>
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          closeAllPopups={closeAllPopups}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleLikeClick}
          onCardDelete={handleDeleteClick}
        />
        <Footer />

        <ImagePopup link={selectedCard?.link} name={selectedCard?.name} isOpen={isImagePopupOpen} onClose={closeAllPopups} />

        <EditProfilePopup  isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/> 

        

        <AddPlacePopup   isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace ={handleAddPlaceSubmit}/> 



        <PopupWithForm
          title="Вы уверены?"
          name="deleteForm"
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
        >
          <button type="submit" className="popup__container-button popup__container-button_type_delete" id="deleteSubmit">Да</button>
        </PopupWithForm>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

      
      </div>
    
  );
}

export default App;