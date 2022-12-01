function getRandomPositiveInteger(a, b){
  if (typeof a !== 'number' || typeof b !== 'number' || a < 0 || b < 0){
    return NaN;
  }

  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = (upper - lower) * Math.random() + lower;

  return Math.floor(result);
}

function getRandomPositiveFloat(a, b, digits){
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
}

getRandomPositiveFloat(1, 10, 6);
getRandomPositiveInteger(2, 12);
