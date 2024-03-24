import { deleteServerCard, putServerLike, deleteServerLike } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

function createCard(item, userNameid, deleteCard, likeCard, openFullImage) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const delButton = cardElement.querySelector('.card__delete-button');
  const cardImg = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeAmount = cardElement.querySelector('.card__like-amount');
  cardImg.src = item.link;
  cardImg.alt = item.name;
  cardElement._id = item._id;
  cardElement.owner_id = item.owner._id;
  likeAmount.textContent = item.likes.length;
  item.likes.forEach(function (obj) {
    if (obj['_id'] === userNameid) {
      likeButton.classList.add('card__like-button_is-active');
    }
  });
  cardElement.querySelector('.card__title').textContent = item.name;
  delButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });
  if (!(cardElement.owner_id === userNameid)) {
    delButton.remove();
  }
  likeButton.addEventListener('click', likeCard);
  cardImg.addEventListener('click', openFullImage);
  return cardElement;
}

function deleteCard(item) {
  deleteServerCard(item['_id'])
    .then(() => {
      item.remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

function likeCard(evt) {
  const likeButton = evt.target;
  const card = likeButton.closest('.card');
  if (!likeButton.classList.contains('card__like-button_is-active')) {
    putServerLike(card['_id'])
      .then((result) => {
        likeButton.classList.toggle('card__like-button_is-active');
        const likeAmount = card.querySelector('.card__like-amount');
        likeAmount.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    deleteServerLike(card['_id'])
      .then((result) => {
        likeButton.classList.toggle('card__like-button_is-active');
        const likeAmount = card.querySelector('.card__like-amount');
        likeAmount.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export { createCard, deleteCard, likeCard };