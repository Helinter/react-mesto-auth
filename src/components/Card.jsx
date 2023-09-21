import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, handleClick, handleLikeClick, handleDeleteClick }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser.currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser.currentUser._id);

  return (
    <div className="element">
      <img className="element__image" src={card.link} alt={card.name} onClick={() => handleClick(card)} />
      <h2 className="element__title">{card.name}</h2>
      <div className="element__likes">
        <button
          type="button"
          className={`element__like-button ${isLiked ? 'element__like-button_active' : ''}`}
          onClick={() => handleLikeClick(card)}
        ></button>
        <p className="element__like-counter">{card.likes.length}</p>
      </div>
      {isOwn && <button type="button" className='element__delete-button' onClick={() => handleDeleteClick(card)}/>} 
    </div>
  );
}

export default Card;
