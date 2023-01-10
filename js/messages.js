import {resetFormElemenements} from './form.js';
import {enableSubmitButton} from './validate.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const successMessage = successMessageTemplate.cloneNode(true);
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorMessage = errorMessageTemplate.cloneNode(true);
const errorButtonElement = document.querySelector('.error__button');

const hideSuccessMessage = () => {
  successMessage.remove();
};

const hideErrorMessage = () => {
  errorMessage.remove();
};

const documentClickHandler = () => {
  hideErrorMessage();
  hideSuccessMessage();
  document.removeEventListener('click', documentClickHandler);
  document.removeEventListener('keydown', documentKeydownHandler);
};

function documentKeydownHandler(evt){
  if (evt.key === 'Escape'){
    hideErrorMessage();
    hideSuccessMessage();
    document.removeEventListener('click', documentClickHandler);
    document.removeEventListener('keydown', documentKeydownHandler);
  }
}

const errorButtonClickHandler = () => {
  hideErrorMessage();
  enableSubmitButton();
};

const showSuccessMessage = () => {
  document.body.append(successMessage);
  document.addEventListener('keydown', documentKeydownHandler);
  document.addEventListener('click', documentClickHandler);
  resetFormElemenements();
};

const showErrorMessage = () => {
  document.body.append(errorMessage);
  document.addEventListener('keydown', documentKeydownHandler);
  document.addEventListener('click', documentClickHandler);
  errorButtonElement.addEventListener('click', errorButtonClickHandler);
};

const showRecieveDataError = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = 'Не удалось получить данные с сервера';
  document.body.append(alertContainer);
};


export {showSuccessMessage,
  showErrorMessage,
  showRecieveDataError
};
