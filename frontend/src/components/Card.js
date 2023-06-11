import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, handlePopup }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  console.log(card.owner)
  const isLiked = card.likes.some((user) => user._id === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;

  return (
    <div className="element">
      {isOwn && (
        <button
          className="element__basket"
          type="button"
          onClick={() => handlePopup.onConfirmCardDelete(card)}
        ></button>
      )}
      <img
        className="element__photo element__photo_type_popup"
        onClick={() => handlePopup.onCardClick(card)}
        src={card.link}
        alt={card.name}
      />
      <div className="element__discription">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-box">
          <button
            className={cardLikeButtonClassName}
            onClick={() => handlePopup.onCardLike(card)}
            type="button"
          ></button>
          <p className="element__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
export default Card;
