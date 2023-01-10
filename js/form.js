import {resetAvatarAndPhotos} from './avatar.js';
import {setTokioCenterAddress} from './map.js';
import {resetSlider} from './slider.js';
import {setSubmitHandler} from './validate.js';

const adFormElement = document.querySelector('.ad-form');
const mapFormElement = document.querySelector('.map__filters');
const offerFormFieldset = adFormElement.querySelectorAll('fieldset');
const mapFormFieldset = mapFormElement.querySelectorAll('fieldset');
const titleElement = adFormElement.querySelector('#title');

const toggleFormDisabled = (form) => {
  const formCls = form.classList.toString().split(' ')[0];
  form.classList.toggle(`${formCls}--disabled`);
};

const disableElements = (elements) =>{
  elements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

const enableElements = (elements) =>{
  elements.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });
};

const makeActive = () => {
  toggleFormDisabled(mapFormElement);
  toggleFormDisabled(adFormElement);
  enableElements(mapFormFieldset);
  enableElements(offerFormFieldset);
};

const makeInactive = () => {
  toggleFormDisabled(mapFormElement);
  toggleFormDisabled(adFormElement);
  disableElements(offerFormFieldset);
  disableElements(mapFormFieldset);
};

const resetFormElemenements = () =>{
  resetSlider();
  titleElement.value = '';
  adFormElement.reset();
  setTokioCenterAddress();
  //setSubmitHandler();
  resetAvatarAndPhotos();
};

export {makeActive, makeInactive, resetFormElemenements};
