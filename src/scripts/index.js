import '../pages/index.css';
import { makeCard, deleteCard, likeCard } from './card.js';
import { openModal, closeModal } from './modal.js';
import { clearValidation, enableValidation } from './validation.js';
import {
  patchServerProfile,
  postServerCard,
  patchServerAvatar,
  getServerProfile,
  getServerCards,
} from './api.js';

const cardsList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const fullImage = document.querySelector('.popup__image');
const userName = document.querySelector('.profile__title');
const userDescription = document.querySelector('.profile__description');
const popupCaption = document.querySelector('.popup__caption');
const editForm = document.forms['edit-profile'];
const addForm = document.forms['new-place'];
const editAvatarForm = document.forms['edit-avatar'];
const inputAvatarFormLink = document.forms['edit-avatar']['link-avatar'];
const inputNameProfile = document.forms['edit-profile'].name;
const inputDescriptionProfile = document.forms['edit-profile'].description;
const inputNewCardTitle = document.forms['new-place']['place-name'];
const inputLinkForm = document.forms['new-place'].link;
const popups = document.querySelectorAll('.popup');
const editAvatarButton = document.querySelector('.profile__image-edit-button');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_type_error',
  inputUrlImageClass: 'popup__input-url-image',
  errorClass: 'popup__input-error_active',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-isunactive',
};

function addCard(cardElement) {
  cardsList.prepend(cardElement); 
};

addForm.addEventListener('submit', submitCardForm);

editForm.addEventListener('submit', submitProfileForm);

editButton.addEventListener('click', () => {
  inputNameProfile.value = userName.textContent;
  inputDescriptionProfile.value = userDescription.textContent;
  clearValidation(editForm, validationConfig);
  openModal(popupEdit);
});

addButton.addEventListener('click', () => {
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
  popupCaption.textContent = evt.target.closest('.card__image').alt;
};

function submitProfileForm(evt) {
  evt.preventDefault();
  const button = evt.target.querySelector('.popup__button');
  button.textContent = 'Сохранение...';
  patchServerProfile(inputNameFormProfile, inputDescriptionFormProfile)
    .then(() => {
      userName.textContent = inputNameFormProfile.value;
      userDescription.textContent = inputDescriptionFormProfile.value;
      clearValidation(editForm, validationConfig);
      closeModal(popupEdit); 
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = 'Сохранить';
    });
};

function submitCardForm(evt) {
  evt.preventDefault(); 
  const item = {};
  item.likes = new Array(); 
  item.name = inputNewCardTitle.value; 
  item.link = inputLinkForm.value; 
  const button = evt.target.querySelector('.popup__button');
  button.textContent = 'Сохранение...';
  postServerCard(item)
    .then((result) => {
      const cardElement = makeCard(
        result,
        userName,
        deleteCard,
        likeCard,
        openFullImage
      );
      addCard(cardElement);
      addCardForm.reset();
      clearValidation(addForm, validationConfig);
      closeModal(popupAddCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      button.textContent = 'Сохранить';
  });
};

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
  
document.addEventListener('click', closeModalButton);
document.addEventListener('click', closeModalOverlay);

enableValidation(validationConfig);

Promise.all([getServerProfile(), getServerCards()])
  .then((results) => {
    userName.textContent = results[0]['name'];
    userName._id = results[0]['_id'];
    userDescription.textContent = results[0]['about'];
    userAvatar.style.backgroundImage = 'url(' + results[0]['avatar'] + ')';
    results[1].reverse();
    results[1].forEach((element) => {
      const cardElement = makeCard(
        element,
        userName,
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

export { addCard };