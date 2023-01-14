const DEBOUNCE_DELAY = 500;

const debounce = (callback, delay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), delay);
  };
};

const getRandomPositiveInteger = (a, b) =>{
  if (typeof a !== 'number' || typeof b !== 'number' || a < 0 || b < 0){
    return NaN;
  }

  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = (upper - lower + 1) * Math.random() + lower;

  return Math.floor(result);
};

const getRandomPositiveFloat = (a, b, digits) =>{
  if (typeof a !== 'number' ||
      typeof b !== 'number' ||
      typeof digits !== 'number' ||
      a < 0 || b < 0 || digits < 0){
    return NaN;
  }

  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  const result = (upper - lower) * Math.random() + lower;

  return +result.toFixed(digits);
};

const getRandomArrayElement = (array) => array[getRandomPositiveInteger(0, array.length - 1)];

const createIdGenerator = function(counter){
  let value = counter;
  return function (){
    return value++;
  };
};

export {getRandomPositiveInteger,
  getRandomPositiveFloat,
  getRandomArrayElement,
  createIdGenerator,
  debounce,
  DEBOUNCE_DELAY
};
