import {MAX_PRICE, validatePrice, getPriceErrorMessage} from './validate.js';


const adFormElement = document.querySelector('.ad-form');
const sliderElement = adFormElement.querySelector('.ad-form__slider');
const priceElement = adFormElement.querySelector('#price');


const createSliderUpdateHandler = () => {
  let skip = true;
  return () => {
    if (skip){
      skip = false;
      return;
    }
    const value = sliderElement.noUiSlider.get();
    priceElement.value = value.split('.')[0];
  };

};

const initSlider = () => {
  const pristine = new Pristine(
    adFormElement,
    {
      classTo: 'ad-form__element',
      errorClass: 'ad-form__element--invalid',
      errorTextParent: 'ad-form__element'
    },
    true);

  pristine.addValidator(priceElement, validatePrice, getPriceErrorMessage);

  noUiSlider.create(sliderElement, {
    start: 0,
    connect: 'lower',
    range: {
      'min': 0,
      'max': MAX_PRICE
    },
    step: 1
  });

  sliderElement.noUiSlider.on('update', createSliderUpdateHandler());

  sliderElement.noUiSlider.on('change', () =>{
    pristine.validate(priceElement);
  });
};

const resetSlider = () => {sliderElement.noUiSlider.set(0);};

export {initSlider, resetSlider};
