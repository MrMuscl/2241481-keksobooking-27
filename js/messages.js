import {resetFormElemenements} from './form.js';


const hideSuccessMessage = () => {
  const successElement = document.querySelector('.success');
  if (successElement){
    successElement.remove();
  }
};

const hideErrorMessage = () => {
  const errorElement = document.querySelector('.error');
  if (errorElement){
    errorElement.remove();
  }
};

const documentClickHandler = () => {
  hideErrorMessage();
  hideSuccessMessage();
  document.removeEventListener('click', documentClickHandler);
};

const documentKeydownHandler = (evt) => {
  if (evt.key === 'Escape'){
    hideErrorMessage();
    hideSuccessMessage();
    document.removeEventListener('click', documentClickHandler);
    document.removeEventListener('keydown', documentKeydownHandler);
  }
};

const errorButtonClickHandler = () => {};

const showSuccessMessage = () => {
  const messageTemplate = document.querySelector('#success').content;
  const successMessage = messageTemplate.cloneNode(true);
  document.body.append(successMessage);
  document.addEventListener('keydown', documentKeydownHandler);
  document.addEventListener('click', documentClickHandler);
  resetFormElemenements();
};

const showErrorMessage = () => {
  const messageTemplate = document.querySelector('#error').content;
  const successMessage = messageTemplate.cloneNode(true);
  document.body.append(successMessage);
  document.addEventListener('keydown', documentKeydownHandler);
  document.addEventListener('click', documentClickHandler);

  const errorButtonElement = document.querySelector('.error__button');
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
