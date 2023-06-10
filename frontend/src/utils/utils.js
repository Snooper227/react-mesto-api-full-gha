export const profileSelector = document.querySelector('.popup_type_edit');
export const popupEditOpenButtonElement = document.querySelector('.profile__popup-open');

export const containerSelector = document.querySelector('.elements');
export const cardSelector = document.querySelector('.popup_type_add');
export const popupAddOpenButtonElement = document.querySelector('.profile__add-button');
export const profileName = document.querySelector('.profile__title');
export const profileAbout = document.querySelector('.profile__subtitle');
export const templateSelector = '.element-template';
export const avatarSelector = document.querySelector('.popup_type_avatar');
export const popupAvatarOpenButtonElement = document.querySelector('.profile__avatar-edit-button');
export const profileAvatar = document.querySelector('.profile__avatar');
export const popupImageSelector = document.querySelector('.popup_type_image');
export const popupConfirmationSelector = document.querySelector('.popup_type_confirm');

export const selectors = {
	formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
}

export const initialItems = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
      },
      {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
      },
      {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
      },
      {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
      },
      {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
      },
      {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
      }
];
