function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEscape);
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEscape);
}

function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
}

export { openModal, closeModal, closePopupEscape };