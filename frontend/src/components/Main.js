import React from "react";
import BigKrest from "../images/krest.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <button
            className="profile__avatar-edit-button"
            onClick={props.onEditAvatar}
            type="button"
          >
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Аватар пользователя"
            />
          </button>
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__popup-open"
              onClick={props.onEditProfile}
              type="button"
            ></button>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          onClick={props.onNewPlace}
          type="button"
        >
          <img className="profile__close" src={BigKrest} alt="крестик" />
        </button>
      </section>

      <section className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            handlePopup={props}
            handleCardLike={props}
            handleCardDelete={props}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
