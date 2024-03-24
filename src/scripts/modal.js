function openModal(popup) {
  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', closeByClick);
  document.addEventListener('keydown', closePopupEscape)
};
  
function closeByClick(evt) {
  const closeButton = evt.currentTarget.querySelector('.popup__close');
  if(evt.target === evt.currentTarget || evt.target === closeButton) {
      closeModal(evt.currentTarget);
  }
};

function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
};

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click', closeByClick);
  document.removeEventListener('keydown', closePopupEscape);
};

export { openModal, closeModal };