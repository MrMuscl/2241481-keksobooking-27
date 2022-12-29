const adFormElement = document.querySelector('.ad-form');
const mapFormElement = document.querySelector('.map__filters');
const offerFormFieldset = adFormElement.querySelectorAll('fieldset');
const mapFormFieldset = mapFormElement.querySelectorAll('fieldset');

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

export {makeActive, makeInactive};
