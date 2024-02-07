// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardList = document.querySelector('.places__list');
// @todo: Функция создания карточки
function makeCard(cardItem, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const delButton = cardElement.querySelector('.card__delete-button');
  const cardPic = cardElement.querySelector('.card__image');
  cardPic.src = cardItem.link;
  cardPic.alt = cardItem.name;
  cardElement. querySelector('.card__title').textContent = cardItem.name;

  delButton.addEventListener('click', () => {
    deleteCard(delButton);
  });
  return cardElement;
}; 

function addCard(cardElement) {
  cardList.append(cardElement);
}
// @todo: Функция удаления карточки
function deleteCard(button) {
  button.closest('.card').remove()
}
// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  const cardElement = makeCard(element, deleteCard);
  addCard(cardElement);
});