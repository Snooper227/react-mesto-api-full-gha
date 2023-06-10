import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarLink = React.useRef();

  React.useEffect(() => {
    if (isOpen) {
      avatarLink.current.value = "";
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarLink.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить Аватар"
      name="avatar"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <section className="popup__section">
        <input
          className="popup__input popup__input_type_link"
          name="link"
          type="url"
          id="avatar-input"
          placeholder="Ссылка на картинку"
          ref={avatarLink}
          required
        />
        <span className="popup__input-error" id="avatar-input-error"></span>
      </section>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
