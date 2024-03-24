import '../pages/index.css';
import { createCard, deleteCard, likeCard } from './card.js';
import { openModal, closeModal } from './modal.js';
import { clearValidation, enableValidation } from './validation.js';
import {
  changeServerProfile,
  postServerCard,
  changeServerAvatar,
  takeServerProfile,
  takeServerCards,
} from './api.js';

const placesList = document.querySelector('.places__list');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const buttonAddCardProfile = document.querySelector('.profile__add-button');
const formInputLinkAvatar = document.forms['edit-avatar']['link-avatar'];
const formInputProfileName = document.forms['edit-profile'].name;
const formInputProfileDescription = document.forms['edit-profile'].description;
const formInputAddNewCardTitle = document.forms['new-place']['place-name'];
const formInputLinkNewCard = document.forms['new-place'].link;
const popupCaptionImage = document.querySelector('.popup__caption');
const popups = document.querySelectorAll('.popup');
const buttonEditAvatar = document.querySelector('.profile__image-edit-button');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupOpenFullImage = document.querySelector('.popup__image');
const profileUserName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const userAvatar = document.querySelector('.profile__image');
const formEditProfile = document.forms['edit-profile'];
const formAddNewPlace = document.forms['new-place'];
const formEditAvatar = document.forms['edit-avatar'];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-isunactive',
  inputErrorClass: 'popup__input_type_error',
  inputUrlImageClass: 'popup__input-url-image',
  errorClass: 'popup__input-error_active',
};

function addCard(cardElement) {
  placesList.prepend(cardElement);
}

formAddNewPlace.addEventListener('submit', submitCardForm);

formEditProfile.addEventListener('submit', submitProfileForm);

buttonOpenPopupProfile.addEventListener('click', () => {
  formInputProfileName.value = profileUserName.textContent;
  formInputProfileDescription.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openModal(popupEdit);
});

buttonAddCardProfile.addEventListener('click', () => {
  openModal(popupAddNewCard);
});

buttonEditAvatar.addEventListener('click', () => {
  openModal(popupEditAvatar);
});

formEditAvatar.addEventListener('submit', editAvatarFormSubmit);

function editAvatarFormSubmit(evt) {
  evt.preventDefault();
  const button = evt.target.querySelector('.popup__button');
  button.textContent = 'Сохранение...';
  changeServerAvatar(formInputLinkAvatar.value)
    .then(() => {
      userAvatar.style.backgroundImage =
        'url(' + formInputLinkAvatar.value + ')';
        formEditAvatar.reset();
      clearValidation(formEditAvatar, validationConfig);
      closeModal(popupEditAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = 'Сохранить';
    });
}

function openFullImage(evt) {
  openModal(popupImage);
  popupOpenFullImage.src = evt.target.closest('.card__image').src;
  popupOpenFullImage.alt = evt.target.closest('.card__image').alt;
  popupCaptionImage.textContent = evt.target.closest('.card__image').alt; 
}

function submitProfileForm(evt) {
  evt.preventDefault();
  const button = evt.target.querySelector('.popup__button');
  button.textContent = 'Сохранение...';
  changeServerProfile(formInputProfileName, formInputProfileDescription)
    .then(() => {
      profileUserName.textContent = formInputProfileName.value;
      profileDescription.textContent = formInputProfileDescription.value;
      clearValidation(formEditProfile, validationConfig);
      closeModal(popupEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = 'Сохранить';
    });
}

function submitCardForm(evt) {
  evt.preventDefault();
  const item = {};
  item.likes = new Array();
  item.name = formInputAddNewCardTitle.value;
  item.link = formInputLinkNewCard.value;
  const button = evt.target.querySelector('.popup__button');
  button.textContent = 'Сохранение...';
  postServerCard(item)
    .then((result) => {
      let profileUserNameId = result[0]['_id']
      const cardElement = createCard(
        result,
        profileUserNameId,
        deleteCard,
        likeCard,
        openFullImage
      );
      addCard(cardElement);
      formAddNewPlace.reset();
      clearValidation(formAddNewPlace, validationConfig);
      closeModal(popupAddNewCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = 'Сохранить';
    });
}

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-opened')) {
      closeModal(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closeModal(popup);
    }
  });
});

enableValidation(validationConfig);

Promise.all([takeServerProfile(), takeServerCards()])
  .then((results) => {
    profileUserName.textContent = results[0]['name'];
    profileUserName._id = results[0]['_id'];
    profileDescription.textContent = results[0]['about'];
    userAvatar.style.backgroundImage = 'url(' + results[0]['avatar'] + ')';
    results[1].reverse();
    results[1].forEach((element) => {
      const cardElement = createCard(
        element,
        profileUserName._id,
        deleteCard,
        likeCard,
        openFullImage
      );
      addCard(cardElement);
    });
  })
  .catch((err) => {
    console.log(err);
  });