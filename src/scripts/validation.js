const showInputError = (
  formElement, 
  inputElement, 
  errorMessage,
  validationConfig
  ) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig['inputErrorClass']);
  errorElement.classList.remove(validationConfig['errorClass']);
  errorElement.textContent = '';
};
  
const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    if (
      inputElement.classList.contains(validationConfig['inputUrlImageClass'])
    ) {
      inputElement.setCustomValidity(
        'Вставьте ссылку, которая ведет на изображение'
      );
    } else {
      inputElement.setCustomValidity(
        'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы'
      );
    }
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};
  
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig['inputSelector'])
  );
  const buttonElement = formElement.querySelector(
    validationConfig['submitButtonSelector']
  );
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(inputList, buttonElement, validationConfig); 
      checkInputValidity(formElement, inputElement, validationConfig);
    });
  });
};
  
const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig['formSelector']));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
      setEventListeners(formElement, validationConfig);
  });
};
  
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => { 
    return !inputElement.validity.valid;
  });
};
  
function toggleButtonState(inputList, buttonElement, validationConfig) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig['inactiveButtonClass']);
    buttonElement.disabled = true;
  } else
    buttonElement.classList.remove(validationConfig['inactiveButtonClass']);
    buttonElement.disabled = false;
};
  
function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig['inputSelector']));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig); 
  });
  const buttonElement = formElement.querySelector(validationConfig['submitButtonSelector']);
  buttonElement.classList.add(validationConfig['inactiveButtonClass']);
  buttonElement.disabled = true;
};
  
export { clearValidation, enableValidation };