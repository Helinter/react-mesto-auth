import React, { useRef } from 'react';
import addButton from '../images/add-button.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header';
import Footer from './Footer';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,  
  onCardLike,
  onCardDelete,
}) {

  const { currentUser } = React.useContext(CurrentUserContext);
  const elementRef = useRef();
  return (
    <>
    <Header linkTo="/sign-in" linkName="Выйти" email={currentUser.email}/>
      <section className="profile">
        <div className="profile__avatar-container" src={`url(${currentUser.avatar})` }>
          <img className="profile__avatar" src={currentUser.avatar} alt="аватар" />
          <button type="button" className="button profile__avatar-edit-icon" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__info-title">{currentUser.name}</h1>
          <button type="button" className="button profile__info-edit-button" onClick={onEditProfile}></button>
          <p className="profile__info-subtitle">{currentUser.about}</p>
        </div>
        <button type="button" className="button profile__add-button" onClick={onAddPlace}>
          <img className="profile__add-button-image" src={addButton} alt="плюс" />
        </button>
      </section>
      <section ref={elementRef} className="elements">
        {cards.map((card) => (
          <Card key={card._id} card={card} handleClick={onCardClick}  handleLikeClick ={onCardLike} handleDeleteClick={onCardDelete}/>  
        ))}
      </section>
      <Footer />
    </>
  );
}

export default Main;
