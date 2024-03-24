import '../pages/index.css';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getServerProfile, getServerCards, postServerCard, patchServerProfile, patchServerAvatar, deleteServerCard, deleteServerLike, putServerLike } from './api.js';
import { createCard, deleteCardFromLayout, toggleLike } from './card.js';

const cardsList = document.querySelector('.places__list');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const fullImage = document.querySelector('.popup__image');
const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__description');
const userAvatar = document.querySelector('.profile__image');
const editProfileForm = document.forms['edit-profile'];
const addCardForm = document.forms['new-place'];
const editAvatarForm = document.forms['edit-avatar'];
const inputAvatarFormLink = document.forms['edit-avatar']['link-avatar'];
const inputNameFormProfile = document.forms['edit-profile'].name;
const inputDescriptionFormProfile = document.forms['edit-profile'].description;
const inputTitleFormAddNewCard = document.forms['new-place']['place-name'];
const inputLinkFormAddNewCard = document.forms['new-place'].link;
const popupImageCaption = document.querySelector('.popup__caption');
const popups = document.querySelectorAll('.popup');
const editAvatarButton = document.querySelector('.profile__image-edit-button');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');

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
  cardsList.prepend(cardElement);
}

addCardForm.addEventListener('submit', submitCardForm);

editProfileForm.addEventListener('submit', submitProfileForm);

editProfileButton.addEventListener('click', () => {
  inputNameFormProfile.value = userName.textContent;
  inputDescriptionFormProfile.value = userDescription.textContent;
  clearValidation(editProfileForm, validationConfig);
  openModal(popupEdit);
});

addCardButton.addEventListener('click', () => {
  openModal(popupAddCard); 
});

editAvatarButton.addEventListener('click', () => {
  openModal(popupEditAvatar);
});

editAvatarForm.addEventListener('submit', editAvatarFormSubmit);

function openFullImage(evt) {
  openModal(popupImage); 
  fullImage.src = evt.target.closest('.card__image').src;
  fullImage.alt = evt.target.closest('.card__image').alt;
  popupImageCaption.textContent = evt.target.closest('.card__image').alt;
}

function submitProfileForm(evt) {
  evt.preventDefault();
  const button = evt.target.querySelector('.popup__button');
  button.textContent = 'Сохранение...';
  patchServerProfile(inputNameFormProfile, inputDescriptionFormProfile)
    .then(() => {
      userName.textContent = inputNameFormProfile.value;
      userDescription.textContent = inputDescriptionFormProfile.value;
      clearValidation(editProfileForm, validationConfig);
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
  item.name = inputTitleFormAddNewCard.value;
  item.link = inputLinkFormAddNewCard.value;
  const button = evt.target.querySelector('.popup__button');
  button.textContent = 'Сохранение...';
  postServerCard(item)
    .then((result) => {
      const cardElement = createCard(
        result,
        userName,
        deleteCardFromLayout,
        toggleLike,
        openFullImage
      );
      addCard(cardElement); 
      addCardForm.reset(); 
      clearValidation(addCardForm, validationConfig);
      closeModal(popupAddCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = 'Сохранить';
    });
}

function editAvatarFormSubmit(evt) {
  evt.preventDefault();
  const button = evt.target.querySelector('.popup__button');
  button.textContent = 'Сохранение...';
  patchServerAvatar(inputAvatarFormLink.value)
    .then(() => {
      userAvatar.style.backgroundImage =
        'url(' + inputAvatarFormLink.value + ')';
      editAvatarForm.reset();
      clearValidation(editAvatarForm, validationConfig);
      closeModal(popupEditAvatar);
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

Promise.all([getServerProfile(), getServerCards()])
  .then((results) => {
    userName.textContent = results[0]['name'];
    userName._id = results[0]['_id'];
    userDescription.textContent = results[0]['about'];
    userAvatar.style.backgroundImage = 'url(' + results[0]['avatar'] + ')';
    results[1].reverse();
    results[1].forEach((element) => {
      const cardElement = createCard(
        element,
        userName,
        deleteCardFromLayout,
        toggleLike,
        openFullImage
      );
      addCard(cardElement); 
    });
  })
  .catch((err) => {
    console.log(err); 
  });

export { addCard };