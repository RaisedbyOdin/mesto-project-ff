import { cardTemplate } from './index.js';

function makeCard(cardItem, deleteCard, likeCard, openFullImage) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const delButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardPic = cardElement.querySelector('.card__image');
  cardPic.src = cardItem.link;
  cardPic.alt = cardItem.name;
  cardElement.querySelector('.card__title').textContent = cardItem.name;
  
  delButton.addEventListener('click', () => {
    deleteCard(delButton);
  });
  cardPic.addEventListener('click', openFullImage);
  likeButton.addEventListener('click', likeCard);
  return cardElement;
}; 

function deleteCard(button) {
  button.closest('.card').remove();
};

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
};

export { makeCard, deleteCard, likeCard };