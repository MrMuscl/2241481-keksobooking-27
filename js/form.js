import {resetAvatarAndPhotos} from './avatar.js';
import {setTokioCenterAddress} from './map.js';
import {resetSlider} from './slider.js';

const adFormElement = document.querySelector('.ad-form');
const filterFormElement = document.querySelector('.map__filters');
const offerFormFieldset = adFormElement.querySelectorAll('fieldset');
const filterFormFieldset = filterFormElement.querySelectorAll('fieldset');
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

const enableFilters = () => {
  toggleFormDisabled(filterFormElement);
  enableElements(filterFormFieldset);
};

const disableFilters = () => {
  toggleFormDisabled(filterFormElement);
  disableElements(filterFormFieldset);
};

const makeActive = () => {

  toggleFormDisabled(adFormElement);
  enableElements(offerFormFieldset);
};

const makeInactive = () => {
  toggleFormDisabled(filterFormElement);
  toggleFormDisabled(adFormElement);
  disableElements(offerFormFieldset);
  disableElements(filterFormFieldset);
};

const resetFormElemenements = () =>{
  resetSlider();
  titleElement.value = '';
  adFormElement.reset();
  setTokioCenterAddress();
  resetAvatarAndPhotos();
};

export {makeActive,
  makeInactive,
  resetFormElemenements,
  enableFilters,
  disableFilters
};
