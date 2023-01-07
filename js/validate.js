import {sendData} from './api.js';
import {showErrorMessage, showSuccessMessage} from './messages.js';

const adFormElement = document.querySelector('.ad-form');
const priceElement = adFormElement.querySelector('#price');
const roomNumberElement = adFormElement.querySelector('#room_number');
const capacityElement = adFormElement.querySelector('#capacity');
const typeElement = adFormElement.querySelector('#type');
const checkinElement = adFormElement.querySelector('#timein');
const checkoutElement = adFormElement.querySelector('#timeout');
const submitButtonElement = adFormElement.querySelector('.ad-form__submit');

const MAX_PRICE = 100000;

const MIN_PRICES_FOR_TYPES = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

const roomToGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const pristine = new Pristine(
  adFormElement,
  {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    errorTextParent: 'ad-form__element'
  },
  true);

const enableSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Опубиликовать';
};

const disableSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Публикую...';
};

const getGuestNumberErrorMessage = () =>{
  let guestWord = 'гостя';
  if ((roomToGuests[roomNumberElement.value].includes('0'))){
    return 'Данное количество комнат используется не для гостей';
  }

  if (roomToGuests[roomNumberElement.value].length > 1){
    guestWord = 'гостей';
  }
  return `Данное количество комнат вмещает ${roomToGuests[roomNumberElement.value].join(' или ')} ${guestWord}`;
};


const validatePrice = (value) => value >= MIN_PRICES_FOR_TYPES[typeElement.value] && value <= MAX_PRICE;
const validateCapacity = () => roomToGuests[roomNumberElement.value].includes(capacityElement.value);

const capacityChangeHandler = () =>{
  pristine.validate(capacityElement);
  pristine.validate(roomNumberElement);
};

const getPriceErrorMessage = () => `От ${MIN_PRICES_FOR_TYPES[typeElement.value]} до ${MAX_PRICE} рублей`;

const typeChangeHandler = () =>{
  priceElement.placeholder = MIN_PRICES_FOR_TYPES[typeElement.value];
  pristine.validate(priceElement);
};

const initValidation = () => {
  checkinElement.addEventListener('change', ()=>{checkoutElement.value = checkinElement.value;});
  checkoutElement.addEventListener('change', ()=>{checkinElement.value = checkoutElement.value;});
  capacityElement.addEventListener('change', capacityChangeHandler);
  roomNumberElement.addEventListener('change', capacityChangeHandler);
  typeElement.addEventListener('change', typeChangeHandler);
  pristine.addValidator(capacityElement, validateCapacity, getGuestNumberErrorMessage);
  pristine.addValidator(priceElement, validatePrice, getPriceErrorMessage);

  window.onload = ()=>{
    adFormElement.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const formData = new FormData(evt.target);

      const valid = pristine.validate();
      if (valid){
        disableSubmitButton();
        sendData(
          () => {
            enableSubmitButton();
            showSuccessMessage();
          },
          () => {
            showErrorMessage();
          },
          formData
        );
      }
    });
  };
};

export {initValidation, validatePrice, getPriceErrorMessage, MAX_PRICE};
