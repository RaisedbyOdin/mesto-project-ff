const cardTemplate = document.querySelector('#card-template').content;

function createCard(item, userName, openFullImage, deleteCard, toggleLike) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardName = cardElement.querySelector('.card__title');
  const likeAmount = cardElement.querySelector('.card__like-amount');
  const delButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  
  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardName.textContent = item.name;
  likeAmount.textContent = item.likes.length;

  if(item.owner._id !== userName) {
    delButton.remove();
  }
  
  if(item.likes.some((item) => item._id === userName)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  cardImage.addEventListener('click', function() {
    openFullImage(item.name, item.link);
  });

  delButton.addEventListener('click', function() {
    deleteCard(cardElement, item);
  })

  likeButton.addEventListener('click', (e) => {
    toggleLike(e, item, likeButton, likeAmount);
  })

  return cardElement;
};

function deleteCardFromLayout(item) {
  item.remove();
};

function toggleLike(likeButton, likeAmount, newLikesNumber) {
  likeButton.classList.toggle('card__like-button_is-active');
  likeAmount.textContent = newLikesNumber;
};

export { createCard, deleteCardFromLayout, toggleLike };