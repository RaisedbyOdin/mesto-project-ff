function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEscape)
};
  
function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupEscape);
};
  
function closeModalButton(evt) {
  if (evt.target === evt.target.closest('.popup__close')) {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
};
  
function closeModalOverlay(evt) {
  const popup = document.querySelector('.popup_is-opened');
  if (popup === evt.target) {    
    closeModal(popup);
}};

function closePopupEscape(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
  }
};
  
export {
  openModal,
  closeModal,
  closeModalOverlay,
  closePopupEscape,
  closeModalButton
};