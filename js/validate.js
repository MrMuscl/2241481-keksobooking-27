const adFormElement = document.querySelector('.ad-form');
const priceElement = adFormElement.querySelector('#price');
const roomNumberElement = adFormElement.querySelector('#room_number');
const capacityElement = adFormElement.querySelector('#capacity');
const typeElement = adFormElement.querySelector('#type');
const checkinElement = adFormElement.querySelector('#timein');
const checkoutElement = adFormElement.querySelector('#timeout');


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
    adFormElement.addEventListener('submit', (e) => {
      e.preventDefault();
      const valid = pristine.validate();
      if (valid){
        adFormElement.submit();
      }
    });
  };
};

export {initValidation};
