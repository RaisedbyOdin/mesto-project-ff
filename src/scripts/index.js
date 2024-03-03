import '../pages/index.css';
import { initialCards } from './cards.js';
import { makeCard, deleteCard, likeCard } from './card.js';
import {
    openModal,
    closeModal,
    closeModalOverlay,
    closeModalButton
} from './modal.js';

const cardTemplate = document.querySelector('#card-template').content;
//const cardTemplate2 = document.querySelector('#card-template');
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
const inputNameProfile = document.forms['edit-profile'].name;
const inputDescriptionProfile = document.forms['edit-profile'].description;
const inputNewCardTitle = document.forms['new-place']['place-name'];
const inputLinkForm = document.forms['new-place'].link;

function addCard(cardElement) {
  cardsList.prepend(cardElement); 
};
  
initialCards.forEach((element) => {
  const cardElement = makeCard(element, deleteCard, likeCard, openFullImage); 
  addCard(cardElement); 
});
  
function openFullImage(evt) {
  openModal(popupImage); 
  fullImage.src = evt.target.closest('.card__image').src;
  fullImage.alt = evt.target.closest('.card__image').alt;
  popupCaption.textContent = evt.target.closest('.card__image').alt;
};

function profileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = inputNameProfile.value; 
  userDescription.textContent = inputDescriptionProfile.value; 
  closeModal(popupEdit); 
};

function cardFormSubmit(evt) {
  evt.preventDefault(); 
  const item = {}; 
  item.name = inputNewCardTitle.value; 
  item.link = inputLinkForm.value; 
  const cardElement = makeCard(item, deleteCard, likeCard, openFullImage); 
  addCard(cardElement); 
  addCardForm.reset(); 
  closeModal(popupAddCard); 
};

addForm.addEventListener('submit', cardFormSubmit);
editForm.addEventListener('submit', profileFormSubmit);
  
editButton.addEventListener('click', () => {
  inputNameProfile.value = userName.textContent;
  inputDescriptionProfile.value = userDescription.textContent;
  openModal(popupEdit);
});
  
addButton.addEventListener('click', () => {
  openModal(popupAddCard);
});
  
document.addEventListener('click', closeModalButton);
document.addEventListener('click', closeModalOverlay);

export {
  cardTemplate,
};