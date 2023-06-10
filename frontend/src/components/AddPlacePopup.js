import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

  function handleChangeName(evt) {
    const target = evt.target.value;
    setName(target);
  }
  function handleChangeLink(evt) {
    const target = evt.target.value;
    setLink(target);
  }
  function handleAddPlaceSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name,
      link
    });
  }

  return (
    <PopupWithForm
      title="Новое Место"
      name="add"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleAddPlaceSubmit}
      buttonText="Создать"
    >
      <section className="popup__section">
        <input
          className="popup__input popup__input_type_title"
          name="title"
          type="text"
          id="place-input"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
          value={name}
          onChange={handleChangeName}
        />
        <span className="popup__input-error" id="place-input-error"></span>
      </section>
      <section className="popup__section">
        <input
          className="popup__input popup__input_type_link"
          name="link"
          type="url"
          id="link-input"
          placeholder="Ссылка на картинку"
          required
          value={link}
          onChange={handleChangeLink}
        />
        <span className="popup__input-error" id="link-input-error"></span>
      </section>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
