import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleChangeName(event) {
    const text = event.target.value;
    setName(text);
  }

  function handleChangeDescription(event) {
    const text = event.target.value;
    setDescription(text);
  }

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
      name="edit"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <section className="popup__section">
        <input
          className="popup__input popup__input_type_name"
          name="name"
          type="text"
          id="name-input"
          placeholder="Имя"
          value={name}
          minLength="2"
          maxLength="40"
          onChange={handleChangeName}
          required
        />
        <span className="popup__input-error" id="name-input-error"></span>
      </section>
      <section className="popup__section">
        <input
          className="popup__input popup__input_type_about"
          name="about"
          type="text"
          id="about-input"
          placeholder="О себе"
          value={description}
          minLength="2"
          maxLength="200"
          onChange={handleChangeDescription}
          required
        />
        <span className="popup__input-error" id="about-input-error"></span>
      </section>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
